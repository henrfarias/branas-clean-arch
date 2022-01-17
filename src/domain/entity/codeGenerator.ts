export class CodeGenerator {
  characters: string
  constructor() {
    this.characters = 'ABCDEFGHIJKLMNOPQRSTUVXZ0123456789'
  }

  public generate(date: Date = new Date(), length: number = 8) {
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
}
