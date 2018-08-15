"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const timers_1 = require("timers");
const HttpClient_1 = require("../../utils/HttpClient");
class Game {
  constructor(id) {
    this.id = id;
    this.client = new HttpClient_1.HttpClient();
    this.refreshRate = 10000;
  }
  getInfo() {
    return this.client.get(`/game/${this.id}/feed/live`).then(response => {
      const { gameData, liveData } = response;
      return { gameData, liveData };
    });
  }
  watch() {
    timers_1.setInterval(this.refreshGamefeed, this.refreshRate);
    this.gameEvents$ = new rxjs_1.BehaviorSubject(null);
    return this.gameEvents$.asObservable();
  }
  stopWatch() {
    timers_1.clearInterval(this.timer);
  }
  async refreshGamefeed() {
    const game = await this.getInfo();
    const scoringPlays = game.liveData.scoringPlays;
    if (
      game.liveData.scoringPlays.length &&
      this.lastScoringPlay !== scoringPlays[scoringPlays.length - 1]
    ) {
      this.lastScoringPlay = scoringPlays[scoringPlays.length - 1];
      const data = game.liveData.plays.allPlays.find(
        p => p.about.eventIdx === this.lastScoringPlay
      );
      this.gameEvents$.next(data);
    }
  }
}
exports.Game = Game;
//# sourceMappingURL=index.js.map
