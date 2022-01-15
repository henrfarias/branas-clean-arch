export default class Cpf {
  value: string[]

  constructor(value: string) {
    this.value = this.format(value)

    if (!this.validate()) throw new Error('Invalid cpf')
  }

  public validate(): boolean {
    const isValidLenght = this.lenghtValidator()
    if (!isValidLenght) return false
    if (this.areAllDigitEquals()) return false
    const checkNumberOne = this.calculateCheckNumber(10)
    const checkNumberTwo = this.calculateCheckNumber(11)
    return this.compareCheckNumbers([checkNumberOne, checkNumberTwo])
  }

  private calculateCheckNumber(multiplier: number) {
    let multiplicationSum = 0
    const lastIndex = multiplier - 1
    for (let i = 0; i < lastIndex; i++) {
      multiplicationSum += +this.value[i] * multiplier--
    }
    const checkNumber = (multiplicationSum * 10) % 11
    return checkNumber
  }

  private compareCheckNumbers(checkNumbers: number[]) {
    const originalCheckNumbers: number[] = this.value
      .slice(-2)
      .map((num: string) => +num)
    const [originalOne, originalTwo] = originalCheckNumbers
    const [checkOne, checkTwo] = checkNumbers
    const isValid = checkOne === originalOne && checkTwo === originalTwo
    return isValid
  }

  private lenghtValidator() {
    const cpfLenght = 11
    return this.value.length === cpfLenght
  }

  private areAllDigitEquals() {
    const [firstDigit] = this.value
    return this.value.every((digit) => digit === firstDigit)
  }

  private format(value: string): string[] {
    return value.replace(/[-. ]/g, '').split('')
  }
}
