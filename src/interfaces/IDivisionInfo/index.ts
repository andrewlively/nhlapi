export interface IDivisionInfo {
  id: number,
  name: string,
  link: string,
  abbreviation: string,
  conference: {
    id: number,
    name: string,
    link: string
  },
  active: boolean
}
