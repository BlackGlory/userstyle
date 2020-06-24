export function addStyleSheet(stylesheet: string): HTMLStyleElement {
  const style = document.createElement('style')
  style.textContent = stylesheet
  document.head.append(style)
  return style
}
