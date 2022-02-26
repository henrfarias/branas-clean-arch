import Cpf from "../../src/checkout/domain/entities/cpf"

test('Deve validar um cpf', function () {
  const cpf = new Cpf('847.903.332-05')
  expect(cpf).toBeDefined()
})

test('Não deve validar um cpf', function () {
  const cpf = '847.903.332'
  expect(() => new Cpf(cpf)).toThrow(new Error('Invalid cpf'))
})
