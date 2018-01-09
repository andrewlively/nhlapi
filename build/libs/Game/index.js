"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("../../utils/HttpClient");
const events_1 = require("events");
const timers_1 = require("timers");
class Game {
    constructor(id) {
        this._id = id;
        this._eventEmitter = new events_1.EventEmitter();
        this._client = new HttpClient_1.default();
        this._refreshRate = 10000;
    }
    getInfo() {
        return this._client
            .get(`/game/${this._id}/feed/live`)
            .then((response) => {
            const { gameData, liveData } = response;
            return { gameData, liveData };
        });
    }
    watch() {
        timers_1.setInterval(this.refreshGamefeed, this._refreshRate);
        return this._eventEmitter;
    }
    stopWatch() {
        timers_1.clearInterval(this._timer);
    }
    async refreshGamefeed() {
        try {
            const game = await this.getInfo();
            const scoringPlays = game.liveData.scoringPlays;
            if (game.liveData.scoringPlays.length &&
                this._lastScoringPlay !== scoringPlays[scoringPlays.length - 1]) {
                this._lastScoringPlay = scoringPlays[scoringPlays.length - 1];
                const data = game.liveData.plays.allPlays.find((p) => p.about.eventIdx === this._lastScoringPlay);
                this._eventEmitter.emit("goal", data);
            }
        }
        catch (err) {
            this._eventEmitter.emit("error", err);
        }
    }
}
exports.default = Game;
//# sourceMappingURL=index.js.map