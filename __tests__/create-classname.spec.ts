import { createClassname } from '@src/create-classname'

describe('createClassname(): string', () => {
  it('return classname starts with userstyle-', () => {
    const result = createClassname()
    const startsWithUserStyle = result.startsWith('userstyle-')

    expect(startsWithUserStyle).toBeTruthy()
  })

  it('return unique classname', () => {
    const result1 = createClassname()
    const result2 = createClassname()

    expect(result1).not.toBe(result2)
  })
})
