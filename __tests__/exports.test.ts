import * as target from '@src/index'

test('exports', () => {
  const expected = [
    'addStyleSheet'
  , 'createClassname'
  , 'addClassRule'
  , 'bindClassToSelector'
  , 'bindStyleToSelector'
  ].sort()

  const exports = Object.keys(target).sort()

  expect(exports).toEqual(expected)
})
