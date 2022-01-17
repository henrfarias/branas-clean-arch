import { CodeGenerator } from '../../src/domain/entity/codeGenerator'

describe('Code generator class', () => {
  test('Should create a code joining year and a serial number', () => {
    const generator = new CodeGenerator()
    const serial = generator.generate(new Date('2021-10-15'))
    expect(serial).toEqual(expect.stringMatching(/^2021.{8}$/))
  })
})
