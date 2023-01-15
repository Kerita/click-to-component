import React, { useEffect, useCallback, useState } from "react";
import { ENV } from "../constants";
import getReactInstancesForElement from "./getReactInstancesForElement";
import getSourceForInstance from "./getSourceForInstance";
import openInstanceInEditor from "./openInstanceInEditor";
import openElementInEditor from "./openElementInEditor";
import getDisplayNameForInstance from "./getDisplayNameForInstance";
import getPropsForInstance from "./getPropsForInstance";
import getStateForInstance from "./getStateForInstance";
import "./index.css";

export const OPTION_KEY_STATUS = {
  HOVER: "HOVER",
  IDLE: "IDLE",
};

let optionKeyStatus = OPTION_KEY_STATUS.IDLE;

const setOptionKeyStatus = (status) => {
  optionKeyStatus = status;
};

export default function ClickToComponent({ editor = "vscode" }) {
  const [instances, setInstances] = useState([]);

  const [contextMenuStyle, setContextMenuStyle] = useState({});

  const handleClick = useCallback(
    (event) => {
      if (optionKeyStatus === OPTION_KEY_STATUS.HOVER) {
        // Forbidden default behavior
        // Stop propagating to other element and listener
        event.preventDefault();
        event.stopPropagation();
        openElementInEditor(event.target, editor);
        setOptionKeyStatus(OPTION_KEY_STATUS.IDLE);
      }

      setTimeout(() => {
        setInstances([]);
      }, 0);
    },
    [editor]
  );

  const handleKeyDown = useCallback((event) => {
    if (event.altKey) {
      setOptionKeyStatus(OPTION_KEY_STATUS.HOVER);
    }
  }, []);

  const handleKeyUp = useCallback(() => {
    setOptionKeyStatus(OPTION_KEY_STATUS.IDLE);
  }, []);

  const handleContextMenu = useCallback((event) => {
    if (optionKeyStatus === OPTION_KEY_STATUS.HOVER) {
      event.preventDefault();
      event.stopPropagation();
      const instances = getReactInstancesForElement(event.target);
      setTimeout(() => {
        setInstances(instances);
        setContextMenuStyle({
          position: "fixed",
          left: `${event.clientX}px`,
          top: `${event.clientY}px`,
        });
      }, 0);
    }
  }, []);

  useEffect(() => {
    function addEventListenerToWindow() {
      // the event will be dispatched to this listener before been dispatched to event target
      window.addEventListener("click", handleClick, {
        capture: true,
      });

      window.addEventListener("keyup", handleKeyUp);

      window.addEventListener("keydown", handleKeyDown);

      window.addEventListener("contextmenu", handleContextMenu, {
        capture: true,
      });
    }

    addEventListenerToWindow();

    return function removeEventListenerFromWindow() {
      window.removeEventListener("click", handleClick, {
        capture: true,
      });

      window.removeEventListener("onKeyUp", handleKeyUp);

      window.removeEventListener("onKeyDown", handleKeyDown);

      window.removeEventListener("contextmenu", handleContextMenu, {
        capture: true,
      });
    };
  }, [handleClick, handleKeyUp, handleKeyDown, handleContextMenu]);

  if (process.env.NODE_ENV === ENV.DEVELOPMENT && instances.length) {
    let longestPath = "";
    return (
      <div className="context-menu" style={contextMenuStyle}>
        {instances.map((instance) => {
          const { columnNumber, fileName, lineNumber } =
            getSourceForInstance(instance);
          const path = `${fileName}:${lineNumber}:${columnNumber}`.replace(
            /.*(src|pages)/,
            "$1"
          );
          longestPath = path.length > longestPath.length ? path : longestPath;
          const props = getPropsForInstance(instance);
          const state = getStateForInstance(instance);
          console.log("kerita log:", instance, "instance");
          return (
            <div
              key={instance.selfBaseDuration}
              className="context-menu-item"
              onClick={() => {
                setTimeout(() => {
                  setInstances([]);
                }, 0);
                openInstanceInEditor(instance, editor);
              }}
            >
              <div className="name">
                <code>
                  {`<${getDisplayNameForInstance(instance)} />`}
                  {!!props && (
                    <div className="props">
                      Props:{" "}
                      {Object.entries(props).map(([prop, value]) => (
                        <span key={prop} title={value}>
                          {prop === "children" ? null : `${prop}=${value}  `}
                        </span>
                      ))}
                    </div>
                  )}

                  {!!state && (
                    <div className="props">
                      State:{" "}
                      {Object.entries(state).map(([key, value]) => (
                        <span key={key} title={value}>
                          {`${key}=${value}  `}
                        </span>
                      ))}
                    </div>
                  )}
                </code>
              </div>
              <div>{path}</div>
            </div>
          );
        })}

        <div className="context-menu-item longest-file-name">{longestPath}</div>
      </div>
    );
  }

  return null;
}
