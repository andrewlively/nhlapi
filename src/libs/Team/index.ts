import { format } from "date-fns";
import { IGameInfo } from "../../interfaces/IGameInfo";
import { ITeamInfo } from "../../interfaces/ITeamInfo";
import { HttpClient } from "../../utils/HttpClient";
import { Player } from "../Player";

export enum TEAMS {
  NEW_JERSEY_DEVILS = 1,
  NEW_YORK_ISLANDERS = 2,
  NEW_YORK_RANGERS = 3,
  PHILADELPHIA_FLYERS = 4,
  PITTSBURGH_PENGUINS = 5,
  BOSTON_BRUINS = 6,
  BUFFALO_SABRES = 7,
  MONTREAL_CANADIENS = 8,
  OTTAWA_SENATORS = 9,
  TORONTO_MAPLE_LEAFS = 10,
  CAROLINA_HURRICANES = 12,
  FLORIDA_PANTHERS = 13,
  TAMPA_BAY_LIGHTNING = 14,
  WASHINGTON_CAPITALS = 15,
  CHICAGO_BLACKHAWKS = 16,
  DETROID_RED_WINGS = 17,
  NASHVILLE_PREDATORS = 18,
  ST_LOUIS_BLUES = 19,
  CALGARY_FLAMES = 20,
  COLORADO_AVALANCHE = 21,
  EDMONTON_OILERS = 22,
  VANCOUVER_CANUCKS = 23,
  ANAHEIM_DUCKS = 24,
  DALLAS_STARS = 25,
  LOS_ANGELES_KINGS = 26,
  SAN_JOSE_SHARKS = 28,
  COLUMBUS_BLUE_JACKETS = 29,
  MINNESOTA_WILD = 30,
  WINNIPEG_JETS = 52,
  ARIZONA_COYOTES = 53,
  VEGAS_GOLDEN_KNIGHTS = 54
};

export class Team {
  private id: number;
  private client: HttpClient;

  constructor(id: number) {
    this.id = id;
    this.client = new HttpClient();
  }

  public getInfo(): Promise<ITeamInfo> {
    return this.client
      .get(`/teams/${this.id}`)
      .then((response: any) => {
        if (!response || !response.teams.length) {
          return Promise.reject("Failed to get team info");
        }

        return response.teams[0];
      });
  }

  public getRoster(): Promise<Player[]> {
    return this.client
      .get(`/teams/${this.id}/roster`)
      .then((response: any) => {
        return response.roster.map((player: any) => new Player(player));
      });
  }

  public getSchedule({
    startDate,
    endDate,
    season
  }: {
      startDate: Date;
      endDate: Date;
      season: string;
    }): Promise<IGameInfo[]> {
    return this.client
      .get(`/schedule`, {
        endDate: format(endDate, "YYYY-MM-DD"),
        season,
        startDate: format(startDate, "YYYY-MM-DD"),
        teamId: this.id
      })
      .then((response: { dates: any[] }) => {
        return response.dates.reduce((games, date) => {
          if (!date.games || !date.games.length) { return; }

          return [
            ...games,
            ...date.games.map((game: any) => {
              game.gameDate = new Date(game.gameDate);

              return game;
            })
          ]
        }, []);
      });
  }
}
