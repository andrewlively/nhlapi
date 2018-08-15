"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const timers_1 = require("timers");
const HttpClient_1 = require("../../utils/HttpClient");
class Game {
  constructor(id) {
    this.id = id;
    this.eventEmitter = new events_1.EventEmitter();
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
    return this.eventEmitter;
  }
  stopWatch() {
    timers_1.clearInterval(this.timer);
  }
  async refreshGamefeed() {
    try {
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
        this.eventEmitter.emit("goal", data);
      }
    } catch (err) {
      this.eventEmitter.emit("error", err);
    }
  }
}
exports.Game = Game;
//# sourceMappingURL=index.js.map
