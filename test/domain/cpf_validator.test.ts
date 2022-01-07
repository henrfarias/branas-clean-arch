import { CPFValidator } from '../../src/domain/cpf_validator'

describe('CPF Validator class', () => {
  test('should return true if cpf is valid', () => {
    const cpfValidator = new CPFValidator('529.982.247-25')
    expect(cpfValidator.validate()).toBe(true)
  })
  test('should accept some formats of cpf', () => {
    const cpfs = [
      '036.916.300-14',
      '03691630014',
      '036-916-300-14',
      '036.916.300.14',
      '036 916 300 14',
    ]
    for (let cpf of cpfs) {
      const cpfValidator = new CPFValidator(cpf)
      expect(cpfValidator.validate()).toBe(true)
    }
    expect.assertions(cpfs.length)
  })
  test('should return false if cpf has a smaller size', () => {
    const cpfValidator = new CPFValidator('0369163001')
    expect(cpfValidator.validate()).toBe(false)
  })
  test('should return false if cpf has a larger size', () => {
    const cpfValidator = new CPFValidator('036916300141')
    expect(cpfValidator.validate()).toBe(false)
  })
  test('should return false if cpf has a invalid check numbers (01)', () => {
    const cpfValidator = new CPFValidator('03691630054')
    expect(cpfValidator.validate()).toBe(false)
  })
  test('should return false if cpf has a invalid check numbers (02)', () => {
    const cpfValidator = new CPFValidator('03691630016')
    expect(cpfValidator.validate()).toBe(false)
  })
})
