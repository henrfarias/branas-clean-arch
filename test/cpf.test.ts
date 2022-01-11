import Cpf from '../src/cpf'

test('Deve validar um cpf', function () {
  const cpf = new Cpf('038.892.580-93')
  expect(cpf).toBeDefined()
})

test('Não deve validar um cpf', function () {
  const cpf = '038.892.580'
  expect(() => new Cpf(cpf)).toThrow(new Error('Invalid cpf'))
})
