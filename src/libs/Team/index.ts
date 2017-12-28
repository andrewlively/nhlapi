import HttpClient from "../../utils/HttpClient";
import Player from "../Player";

export default class Team {
  private _id: number;
  private _client: HttpClient;

  constructor(id: number) {
    this._id = id;
    this._client = new HttpClient();
  }

  roster(): Promise<Player[]> {
    return this._client
      .get(`/teams/${this._id}/roster`)
      .then((response: any) => {
        return response.roster.map((player: any) => new Player(player));
      });
  }

  schedule({
    startDate,
    endDate,
    season
  }: {
    startDate: string;
    endDate: string;
    season: string;
  }) {
    return this._client
      .get(`/schedule`, { startDate, endDate, season, teamId: this._id })
      .then((response: any) => {
        return response.dates;
      });
  }
}
