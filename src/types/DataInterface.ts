export default interface DataInterface{
  name: string,
  placeholder: string,
  value: string,
  validation: {
    required: {
      value: boolean,
      msg: string
    },
    length: {
      min: number,
      max: number,
      value: boolean,
      msg: string
    }
  }
}