import * as t from "@babel/types";

export function displayChild(node: t.JSXElement) {
  const elementName = (node.openingElement.name as t.JSXIdentifier).name;
  if (node.children.length === 0) {
    return;
  }

  const value = node.children[0];
  if (t.isJSXText(value)) {
    const text = value.value.trim();
    if (text === "") {
      const childrenElementName = node.children
        .map((child) => {
          if (t.isJSXElement(child)) {
            const elementName = (child.openingElement.name as t.JSXIdentifier)
              .name;
            return elementName;
          }
        })
        .filter(Boolean);
      console.log(elementName + " -> " + childrenElementName.join(", "));
      return elementName;
    }
    console.log(elementName + "  -> " + text);
    return text;
  }

  if (
    t.isJSXExpressionContainer(value) &&
    t.isStringLiteral(value.expression)
  ) {
    console.log(`${elementName} -> ${value.expression.value}`);
    return value.expression.value;
  }

  return;
}
