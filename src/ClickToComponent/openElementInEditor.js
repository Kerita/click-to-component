import getReactInstanceForElement from "./getReactInstanceForElement";
import openInstanceInEditor from "./openInstanceInEditor";

export default function openElementInEditor(element, editor) {
  const instance = getReactInstanceForElement(element);

  openInstanceInEditor(instance, editor);
}
