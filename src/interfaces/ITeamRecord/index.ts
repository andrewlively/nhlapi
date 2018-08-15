import { ILeagueRecord } from "../ILeagueRecord";

export interface ITeamRecord {
  team: {
    id: number,
    name: string,
    link: string
  },
  leagueRecord: ILeagueRecord,
  goalsAgainst: number,
  goalsScored: number,
  points: number,
  divisionRank: string,
  conferenceRank: string,
  leagueRank: string,
  wildCardRank: string,
  row: number,
  gamesPlayed: number,
  streak: {
    streakType: "wins",
    streakNumber: number,
    streakCode: string
  },
  clinchIndicator: string,
  lastUpdated: Date
}