import HttpClient from "../../utils/HttpClient";

export default class Player {
  person: {
    id: number;
    fullName: string;
    link: string;
  };

  jerseyNumber: string;

  position: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };

  private _client: HttpClient;

  constructor(data: any) {
    this.person = data.person;
    this.jerseyNumber = data.jerseyNumber;
    this.position = data.position;

    this._client = new HttpClient();
  }

  getInfo({ expand = [], stats = `` }: { expand?: string[]; stats?: string }) {
    return this._client
      .get(`/people/${this.person.id}`, { expand, stats })
      .then((response: any) => response.people[0]);
  }

  getGameLog(season: string) {
    return this._client
      .get(`/people/${this.person.id}/stats`, { stats: `gameLog`, season })
      .then((response: any) => response.stats.splits);
  }
}
