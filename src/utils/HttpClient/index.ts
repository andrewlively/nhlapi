import { get } from "got";

export class HttpClient {
  private baseUrl: string = "https://statsapi.web.nhl.com/api/v1";

  public get(endpoint: string, query?: any): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    return get(url, { query }).then((response: any) => JSON.parse(response.body));
  }
}
