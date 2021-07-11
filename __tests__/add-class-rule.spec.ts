import { dedent } from 'extra-tags'
import { addClassRule } from '@src/add-class-rule'

describe('addClassRule(classname: string, declaration: string | Partial<CSSStyleDeclaration>): string', () => {
  describe('style is string', () => {
    it('append stylesheet and return HTMLStyleElement', () => {
      const result = addClassRule('test', dedent`
        background: white;
        color: black;
      `)

      expect(result).toBeInstanceOf(HTMLStyleElement)
      expect(result.textContent).toEqual(dedent`
        .test {
          background: white;
          color: black;
        }
      `)
      expect(document.head.lastElementChild).toBe(result)
    })
  })

  describe('style is Partial<CSSStyleDeclaration>', () => {
    it('append stylesheet and return HTMLStyleElement', () => {
      const result = addClassRule('test', {
        background: 'white'
      , color: 'black'
      })

      expect(result).toBeInstanceOf(HTMLStyleElement)
      expect(result.textContent).toEqual(dedent`
        .test {
          background: white;
          color: black;
        }
      `)
      expect(document.head.lastElementChild).toBe(result)
    })
  })
})
