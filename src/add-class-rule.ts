import { addStyleSheet } from './add-style-sheet'
import { dedent } from 'extra-tags'

export function addClassRule(
  classname: string
, declarationBlock: string | Partial<CSSStyleDeclaration>
): HTMLStyleElement {
  const stylesheet = createClassRule(classname, declarationBlock)
  return addStyleSheet(stylesheet)
}

function isString(val: unknown): val is string {
  return typeof val === 'string'
}

function createClassRule(
  classname: string
, declarationBlock: string | Partial<CSSStyleDeclaration>
): string {
  return createRule(
    createSelector(classname)
  , isString(declarationBlock)
    ? declarationBlock
    : createDeclarationBlock(declarationBlock)
  )
}

function createRule(selector: string, declarationBlock: string): string {
  return dedent`
    ${selector} {
      ${declarationBlock}
    }
  `
}

function createSelector(classname: string): string {
  return `.${classname}`
}

function createDeclarationBlock(styles: Partial<CSSStyleDeclaration>): string {
  const declaration = []
  for (const [name, value] of Object.entries(styles)) {
    declaration.push(`${name}: ${value};`)
  }
  return declaration.join('\n')
}
