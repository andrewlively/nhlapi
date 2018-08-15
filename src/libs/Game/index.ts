import { EventEmitter } from "events";
import { clearInterval, setInterval } from "timers";
import { HttpClient } from "../../utils/HttpClient";

export class Game {
  private id: number;
  private eventEmitter: EventEmitter;
  private client: HttpClient;
  private timer: NodeJS.Timer;
  private refreshRate: number;
  private lastScoringPlay: number;

  constructor(id: number) {
    this.id = id;
    this.eventEmitter = new EventEmitter();
    this.client = new HttpClient();
    this.refreshRate = 10000; // Default 10 sec since not sure of API rate limit
  }

  public getInfo() {
    return this.client
      .get(`/game/${this.id}/feed/live`)
      .then((response: any) => {
        const { gameData, liveData } = response;

        return { gameData, liveData };
      });
  }

  public watch(): EventEmitter {
    setInterval(this.refreshGamefeed, this.refreshRate);

    return this.eventEmitter;
  }

  public stopWatch() {
    clearInterval(this.timer);
  }

  private async refreshGamefeed() {
    try {
      const game = await this.getInfo();

      const scoringPlays: number[] = game.liveData.scoringPlays;

      // Goals
      if (
        game.liveData.scoringPlays.length &&
        this.lastScoringPlay !== scoringPlays[scoringPlays.length - 1]
      ) {
        this.lastScoringPlay = scoringPlays[scoringPlays.length - 1];

        const data = game.liveData.plays.allPlays.find(
          (p: any) => p.about.eventIdx === this.lastScoringPlay
        );

        this.eventEmitter.emit("goal", data);
      }
    } catch (err) {
      this.eventEmitter.emit("error", err);
    }
  }
}
