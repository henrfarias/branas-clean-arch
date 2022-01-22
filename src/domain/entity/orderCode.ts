export class OrderCode {
  characters: string
  value: string

  constructor(orderDate: Date, length: number = 8) {
    this.characters = 'ABCDEFGHIJKLMNOPQRSTUVXZ0123456789'
    this.value = this.generate(orderDate, length)
  }

  private generate(date: Date, length: number) {
    const year = date.getFullYear()
    const charactersLength = this.characters.length
    let serial = ''
    for (let i = 0; i < length; i++) {
      serial += this.characters.charAt(
        Math.floor(Math.random() * charactersLength)
      )
    }
    return `${year}${serial}`
  }

  public getValue() {
    const code = this.value
    return code
  }
}
