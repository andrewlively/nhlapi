"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = require("got");
class HttpClient {
  constructor() {
    this.baseUrl = "https://statsapi.web.nhl.com/api/v1";
  }
  get(endpoint, query) {
    const url = `${this.baseUrl}${endpoint}`;
    return got_1
      .get(url, { query })
      .then(response => JSON.parse(response.body));
  }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=index.js.map
