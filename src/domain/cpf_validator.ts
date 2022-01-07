export class CPFValidator {
  cpf: string[]
  constructor(cpf: string) {
    this.cpf = cpf.replace(/[-. ]/g, '').split('')
  }

  public validate(): boolean {
    const checkNumberOne = this.calculateCheckNumber(10)
    const checkNumberTwo = this.calculateCheckNumber(11)
    return this.compareCheckNumbers([checkNumberOne, checkNumberTwo])
  }

  private calculateCheckNumber(multiplier: number) {
    let multiplicationSum = 0
    const lastIndex = multiplier - 1
    for (let i = 0; i < lastIndex; i++) {
      multiplicationSum += +this.cpf[i] * multiplier--
    }
    const checkNumber = (multiplicationSum * 10) % 11
    return checkNumber
  }

  private compareCheckNumbers(checkNumbers: number[]) {
    const originalCheckNumbers: number[] = this.cpf
      .slice(-2)
      .map((num: string) => +num)
    const [originalOne, originalTwo] = originalCheckNumbers
    const [checkOne, checkTwo] = checkNumbers
    const isValid = checkOne === originalOne && checkTwo === originalTwo
    return isValid     
  }
}
