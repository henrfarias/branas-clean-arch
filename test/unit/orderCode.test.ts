import { OrderCode } from '../../src/domain/entity/orderCode'

describe('Code generator class', () => {
  test('Should create a code joining year and a serial number', () => {
    const code = new OrderCode(new Date('2021-10-15'))
    expect(code.getValue()).toEqual(expect.stringMatching(/^2021.{8}$/))
  })
})
