import { Cpf } from '../../src/domain/cpf'

describe('CPF class', () => {
  test('should return a instance of cpf', () => {
    const cpf = Cpf.create('529.982.247-25')
    expect(cpf).toBeDefined()
  })
  test('should accept some formats of cpf', () => {
    const cpfs = [
      '036.916.300-14',
      '03691630014',
      '036-916-300-14',
      '036.916.300.14',
      '036 916 300 14',
    ]
    for (let value of cpfs) {
      const cpf = Cpf.create(value)
      expect(cpf).toBeDefined()
    }
    expect.assertions(cpfs.length)
  })
  test('should throw error if cpf has a smaller size', () => {
    expect(() => Cpf.create('0369163001')).toThrow(new Error('Invalid cpf'))
  })
  test('should throw error if cpf has a larger size', () => {
    expect(() => Cpf.create('036916300141')).toThrow(new Error('Invalid cpf'))
  })
  test('should throw error if cpf has a invalid check numbers (01)', () => {
    expect(() => Cpf.create('03691630054')).toThrow(new Error('Invalid cpf'))
  })
  test('should throw error if cpf has a invalid check numbers (02)', () => {
    expect(() => Cpf.create('03691630016')).toThrow(new Error('Invalid cpf'))
  })
  test('should throw error if cpf has all numbers equals', () => {
    expect(() => Cpf.create('11111111111')).toThrow(new Error('Invalid cpf'))
  })
})
