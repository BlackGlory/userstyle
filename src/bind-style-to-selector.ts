import { createClassname } from './create-classname'
import { addClassRule } from './add-class-rule'
import { bindClassToSelector } from './bind-class-to-selector'

export function bindStyleToSelector(declaration: string | Partial<CSSStyleDeclaration>, selector: () => Iterable<Element>): () => void {
  const classname = createClassname()
  addClassRule(classname, declaration)
  return bindClassToSelector(classname, selector)
}
