import * as https from "https";
import { stringify } from "querystring";
import { IncomingMessage } from "http";

export default class HttpClient {
  private _baseUrl: string = "https://statsapi.web.nhl.com/api/v1";

  constructor() {}

  get(endpoint: string, query?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = `${this._baseUrl}${endpoint}`;

      if (query && Object.keys(query).length) {
        url += `?${stringify(query)}`;
      }

      https
        .get(url, (response: IncomingMessage) => {
          let data = "";

          response.on("data", (chunk: string) => (data += chunk));

          response.on("end", () => resolve(JSON.parse(data)));
        })
        .on("error", (err: Error) => reject(err));
    });
  }
}
