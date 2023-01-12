export default function getSourceForInstance({ _debugSource }) {
  if (!_debugSource) return;

  const { columnNumber = 1, fileName, lineNumber = 1 } = _debugSource;

  return { columnNumber, fileName, lineNumber };
}
