export default function getPathToSource(source) {
  const { fileName, columnNumber = 1, lineNumber = 1 } = source;

  return `${fileName}:${lineNumber}:${columnNumber}`;
}
