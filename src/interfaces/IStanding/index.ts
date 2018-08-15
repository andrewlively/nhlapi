import { ITeamRecord } from "../ITeamRecord";

export interface IStanding {
  standingsType: string,
  league: {
    id: number,
    name: string,
    link: string
  },
  divison: {
    id: number,
    name: string,
    nameShort: string,
    link: string,
    abbreviation: string
  },
  conference: {
    id: number,
    name: string,
    link: string
  },
  teamRecords: ITeamRecord[]
}
