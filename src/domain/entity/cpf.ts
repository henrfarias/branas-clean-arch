export class Cpf {
  cpf: string

  constructor(cpf: string) {
    const value = this.format(cpf)
    if (!this.validate(value)) throw new Error('Invalid cpf')
    this.cpf = value.join('')
  }

  static create(value: string) {
    return new Cpf(value)
  }

  private format(value: string): string[] {
    return value.replace(/[-. ]/g, '').split('')
  }

  private validate(value: string[]): boolean {
    const isValidLenght = this.lenghtValidator(value)
    if (!isValidLenght) return false
    if (this.areAllDigitEquals(value)) return false
    const checkNumberOne = this.calculateCheckNumber(value, 10)
    const checkNumberTwo = this.calculateCheckNumber(value, 11)
    return this.compareCheckNumbers(value, [checkNumberOne, checkNumberTwo])
  }

  private lenghtValidator(value: string[]) {
    const cpfLenght = 11
    return value.length === cpfLenght
  }

  private areAllDigitEquals(value: string[]) {
    const [firstDigit] = value
    return value.every((digit) => digit === firstDigit)
  }

  private calculateCheckNumber(value: string[], multiplier: number) {
    let multiplicationSum = 0
    const lastIndex = multiplier - 1
    for (let i = 0; i < lastIndex; i++) {
      multiplicationSum += +value[i] * multiplier--
    }
    const checkNumber = (multiplicationSum * 10) % 11
    return checkNumber
  }

  private compareCheckNumbers(value: string[], checkNumbers: number[]) {
    const originalCheckNumbers: number[] = value
      .slice(-2)
      .map((num: string) => +num)
    const [originalOne, originalTwo] = originalCheckNumbers
    const [checkOne, checkTwo] = checkNumbers
    const isValid = checkOne === originalOne && checkTwo === originalTwo
    return isValid
  }


}
