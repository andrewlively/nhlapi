"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("../../utils/HttpClient");
class Player {
  constructor(data) {
    this.person = data.person;
    this.jerseyNumber = data.jerseyNumber;
    this.position = data.position;
    this.client = new HttpClient_1.HttpClient();
  }
  getInfo({ expand = [], stats = `` }) {
    return this.client
      .get(`/people/${this.person.id}`, { expand, stats })
      .then(response => response.people[0]);
  }
  getGameLog(season) {
    return this.client
      .get(`/people/${this.person.id}/stats`, { stats: `gameLog`, season })
      .then(response => response.stats.splits);
  }
}
exports.Player = Player;
//# sourceMappingURL=index.js.map
