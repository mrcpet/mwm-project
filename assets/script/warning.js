// export function to add red outline as a warning
export const addRedOutline = (elements) => {
  if (!Array.isArray(elements)) {
    elements = [elements];
  }
  let firstElement = elements[0];
  elements.forEach((element) => {
    element.style.outline = "1px solid red";
    firstElement.focus();
  });
};

// export function to remove red outline if no longer needed
export const removeRedOutLine = (elements) => {
  elements.forEach((element) => {
    element.style.outline = "";
  });
};
