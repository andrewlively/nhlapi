import HttpClient from "../../utils/HttpClient";
import { EventEmitter } from "events";
import { clearInterval, setInterval } from "timers";

export default class Game {
  private _id: number;
  private _eventEmitter: EventEmitter;
  private _client: HttpClient;
  private _timer: NodeJS.Timer;
  private _refreshRate: number;
  private _lastScoringPlay: number;

  constructor(id: number) {
    this._id = id;
    this._eventEmitter = new EventEmitter();
    this._client = new HttpClient();
    this._refreshRate = 10000; // Default 10 sec since not sure of API rate limit
  }

  getInfo() {
    return this._client
      .get(`/game/${this._id}/feed/live`)
      .then((response: any) => {
        const { gameData, liveData } = response;

        return { gameData, liveData };
      });
  }

  watch(): EventEmitter {
    setInterval(this.refreshGamefeed, this._refreshRate);

    return this._eventEmitter;
  }

  stopWatch() {
    clearInterval(this._timer);
  }

  private async refreshGamefeed() {
    try {
      const game = await this.getInfo();

      const scoringPlays: number[] = game.liveData.scoringPlays;

      // Goals
      if (
        game.liveData.scoringPlays.length &&
        this._lastScoringPlay !== scoringPlays[scoringPlays.length - 1]
      ) {
        this._lastScoringPlay = scoringPlays[scoringPlays.length - 1];

        const data = game.liveData.plays.allPlays.find(
          (p: any) => p.about.eventIdx === this._lastScoringPlay
        );

        this._eventEmitter.emit("goal", data);
      }
    } catch (err) {
      this._eventEmitter.emit("error", err);
    }
  }
}
