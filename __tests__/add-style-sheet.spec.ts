import { addStyleSheet } from '@src/add-style-sheet'

describe('addStyleSheet(stylesheet: string): HTMLStyleElement', () => {
  it('append stylesheet to head', () => {
    const stylesheet = `
      body {
        background: 'white';
        color: 'black';
      }
    `

    const result = addStyleSheet(stylesheet)

    expect(result).toBeInstanceOf(HTMLStyleElement)
    expect(document.head.lastElementChild).toBe(result)
    expect(document.head.lastElementChild!.textContent).toBe(stylesheet)
  })
})
