export default interface ICurrency {
  id: number,
  title: string,
  number: number,
  code: string,
  symbol: string,
  value?: number,
  label?: string,
}
