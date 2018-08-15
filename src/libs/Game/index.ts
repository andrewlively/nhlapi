import { BehaviorSubject, Observable } from "rxjs";
import { clearInterval, setInterval } from "timers";
import { HttpClient } from "../../utils/HttpClient";

export class Game {
  private id: number;
  private gameEvents$: BehaviorSubject<any>
  private client: HttpClient;
  private timer: NodeJS.Timer;
  private refreshRate: number;
  private lastScoringPlay: number;

  constructor(id: number) {
    this.id = id;
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

  public watch(): Observable<any> {
    setInterval(this.refreshGamefeed, this.refreshRate);

    this.gameEvents$ = new BehaviorSubject<any>(null);

    return this.gameEvents$.asObservable();
  }

  public stopWatch() {
    clearInterval(this.timer);
  }

  private async refreshGamefeed() {
    const game = await this.getInfo();

    const scoringPlays: number[] = game.liveData.scoringPlays;

    if (
      game.liveData.scoringPlays.length &&
      this.lastScoringPlay !== scoringPlays[scoringPlays.length - 1]
    ) {
      this.lastScoringPlay = scoringPlays[scoringPlays.length - 1];

      const data = game.liveData.plays.allPlays.find(
        (p: any) => p.about.eventIdx === this.lastScoringPlay
      );

      this.gameEvents$.next(data);
    }
  }
}
