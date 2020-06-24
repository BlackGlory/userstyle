import { bindStyleToSelector } from '@src/bind-style-to-selector'
import * as CreateClassname from '@src/create-classname'
import * as AddClassRule from '@src/add-class-rule'
import * as BindClassToSelector from '@src/bind-class-to-selector'

describe('bindStyleToSelector(declaration: string | Partial<CSSStyleDeclaration>, selector: () => Iterable<Element>): () => void ', () => {
  it('called careteClassname, addClassRule, bindClassToSelector', () => {
    resetDOM()
    const createClassname = jest.spyOn(CreateClassname, 'createClassname')
    const addClassRule = jest.spyOn(AddClassRule, 'addClassRule')
    const bindClassToSelector = jest.spyOn(BindClassToSelector, 'bindClassToSelector')
    const style = `
      background: white;
      color: black;
    `
    const selector = () => [document.body]

    bindStyleToSelector(style, selector)

    expect(createClassname).toBeCalled()
    expect(addClassRule).toBeCalledWith(createClassname.mock.results[0].value, style)
    expect(bindClassToSelector).toBeCalledWith(createClassname.mock.results[0].value, selector)
  })
})

function resetDOM() {
  document.documentElement.innerHTML = ''
}
