import getPathToSource from "./getPathToSource";
import getSourceForInstance from "./getSourceForInstance";

export default function openInstanceInEditor(instance, editor) {
  const source = getSourceForInstance(instance);
  const path = getPathToSource(source);
  const url = `${editor}://file/${path}`;
  window.location.assign(url);
}
