export default class OrderCode {
  readonly value: string
  
  constructor (private date: Date, private sequence: number) {
    const year = date.getFullYear()
    const sequence8char = `${sequence}`.padStart(8, '0')
    this.value = `${year}${sequence8char}`
  }
}