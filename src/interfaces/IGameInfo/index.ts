import { ILeagueRecord } from "../ILeagueRecord";

export interface IGameInfo {
  gamePk: number,
  link: string,
  gameType: string,
  season: string,
  gameDate: Date,
  status: {
    abstractGameState: string,
    codedGameState: string,
    detailedState: string,
    statusCode: string,
    startTimeTBD: boolean
  },
  teams: {
    away: {
      leagueRecord: ILeagueRecord,
      score: number,
      team: {
        id: number,
        name: string,
        link: string
      }
    },
    home: {
      leagueRecord: ILeagueRecord,
      score: number,
      team: {
        id: number,
        name: string,
        link: string
      }
    }
  },
  venue: {
    name: string,
    link: string
  },
  content: {
    link: string
  }
}
