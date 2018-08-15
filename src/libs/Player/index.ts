import { HttpClient } from "../../utils/HttpClient";

export class Player {
  public person: {
    id: number;
    fullName: string;
    link: string;
  };
  public jerseyNumber: string;
  public position: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };

  private client: HttpClient;

  constructor(data: any) {
    this.person = data.person;
    this.jerseyNumber = data.jerseyNumber;
    this.position = data.position;

    this.client = new HttpClient();
  }

  public getInfo({ expand = [], stats = `` }: { expand?: string[]; stats?: string }) {
    return this.client
      .get(`/people/${this.person.id}`, { expand, stats })
      .then((response: any) => response.people[0]);
  }

  public getGameLog(season: string) {
    return this.client
      .get(`/people/${this.person.id}/stats`, { stats: `gameLog`, season })
      .then((response: any) => response.stats.splits);
  }
}
