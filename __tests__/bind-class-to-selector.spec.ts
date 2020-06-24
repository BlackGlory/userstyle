import { bindClassToSelector } from '@src/bind-class-to-selector'
import 'core-js/web/queue-microtask'
import { waitForAttached, waitForDOMChanged } from '@blackglory/wait-for'

describe('bindClassToSelector(classname: string, selector: () => Iterable<Element>): () => void', () => {
  it('add class to exist elements that selector match', () => {
    resetDOM()
    const div = document.createElement('div')
    document.body.append(div)
    const classname = 'test'

    const unbind = bindClassToSelector(classname, () => document.getElementsByTagName('div'))
    const isClassExist = div.classList.contains(classname)

    expect(isClassExist).toBeTruthy()
    unbind()
  })

  it('add class to elements that selector new match', async () => {
    resetDOM()
    const div = document.createElement('div')
    document.body.append(div)
    const classname = 'test'

    const unbind = bindClassToSelector(classname, () => document.querySelectorAll('#flag'))
    queueMicrotask(() => div.id = 'flag')
    await waitForDOMChanged()
    const isClassExist = div.classList.contains(classname)

    expect(isClassExist).toBeTruthy()
    unbind()
  })

  it('add class to new elements that selector match', async () => {
    resetDOM()
    const div = document.createElement('div')
    div.id = 'flag'
    const classname = 'test'

    const unbind = bindClassToSelector(classname, () => document.querySelectorAll('#flag'))
    queueMicrotask(() => document.body.append(div))
    await waitForAttached(div)
    const isClassExist = div.classList.contains(classname)

    expect(isClassExist).toBeTruthy()
    unbind()
  })

  it('isnt add class to new elements that selector not match', async () => {
    resetDOM()
    const div = document.createElement('div')
    const classname = 'test'

    const unbind = bindClassToSelector(classname, () => document.querySelectorAll('#flag'))
    queueMicrotask(() => document.body.append(div))
    await waitForAttached(div)
    const isClassExist = div.classList.contains(classname)

    expect(isClassExist).toBeFalsy()
    unbind()
  })

  it('remove class from elements that selector no longer match', async () => {
    resetDOM()
    const div = document.createElement('div')
    div.id = 'flag'
    document.body.append(div)
    const classname = 'test'

    const unbind = bindClassToSelector(classname, () => document.querySelectorAll('#flag'))
    queueMicrotask(() => div.id = '')
    await waitForDOMChanged()
    const isClassExist = div.classList.contains(classname)

    expect(isClassExist).toBeFalsy()
    unbind()
  })

  describe('unbind', () => {
    it('cancel the binding', async () => {
      resetDOM()
      const div = document.createElement('div')
      const classname = 'test'

      const unbind = bindClassToSelector(classname, () => document.querySelectorAll('div'))
      unbind()
      queueMicrotask(() => document.body.append(div))
      await waitForAttached(div)
      const isClassExistAfterUnbind = div.classList.contains(classname)

      expect(isClassExistAfterUnbind).toBeFalsy()
    })

    it('remove class from all elements', () => {
      resetDOM()
      const div = document.createElement('div')
      document.body.append(div)
      const classname = 'test'

      const unbind = bindClassToSelector(classname, () => document.querySelectorAll('div'))
      const isClassExistBeforeUnbind = div.classList.contains(classname)
      unbind()
      const isClassExistAfterUnbind = div.classList.contains(classname)

      expect(isClassExistBeforeUnbind).toBeTruthy()
      expect(isClassExistAfterUnbind).toBeFalsy()
    })
  })
})

function resetDOM() {
  document.documentElement.innerHTML = ''
}
