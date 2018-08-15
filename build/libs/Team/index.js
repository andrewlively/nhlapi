"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const HttpClient_1 = require("../../utils/HttpClient");
const Player_1 = require("../Player");
var TEAMS;
(function(TEAMS) {
  TEAMS[(TEAMS["NEW_JERSEY_DEVILS"] = 1)] = "NEW_JERSEY_DEVILS";
  TEAMS[(TEAMS["NEW_YORK_ISLANDERS"] = 2)] = "NEW_YORK_ISLANDERS";
  TEAMS[(TEAMS["NEW_YORK_RANGERS"] = 3)] = "NEW_YORK_RANGERS";
  TEAMS[(TEAMS["PHILADELPHIA_FLYERS"] = 4)] = "PHILADELPHIA_FLYERS";
  TEAMS[(TEAMS["PITTSBURGH_PENGUINS"] = 5)] = "PITTSBURGH_PENGUINS";
  TEAMS[(TEAMS["BOSTON_BRUINS"] = 6)] = "BOSTON_BRUINS";
  TEAMS[(TEAMS["BUFFALO_SABRES"] = 7)] = "BUFFALO_SABRES";
  TEAMS[(TEAMS["MONTREAL_CANADIENS"] = 8)] = "MONTREAL_CANADIENS";
  TEAMS[(TEAMS["OTTAWA_SENATORS"] = 9)] = "OTTAWA_SENATORS";
  TEAMS[(TEAMS["TORONTO_MAPLE_LEAFS"] = 10)] = "TORONTO_MAPLE_LEAFS";
  TEAMS[(TEAMS["CAROLINA_HURRICANES"] = 12)] = "CAROLINA_HURRICANES";
  TEAMS[(TEAMS["FLORIDA_PANTHERS"] = 13)] = "FLORIDA_PANTHERS";
  TEAMS[(TEAMS["TAMPA_BAY_LIGHTNING"] = 14)] = "TAMPA_BAY_LIGHTNING";
  TEAMS[(TEAMS["WASHINGTON_CAPITALS"] = 15)] = "WASHINGTON_CAPITALS";
  TEAMS[(TEAMS["CHICAGO_BLACKHAWKS"] = 16)] = "CHICAGO_BLACKHAWKS";
  TEAMS[(TEAMS["DETROID_RED_WINGS"] = 17)] = "DETROID_RED_WINGS";
  TEAMS[(TEAMS["NASHVILLE_PREDATORS"] = 18)] = "NASHVILLE_PREDATORS";
  TEAMS[(TEAMS["ST_LOUIS_BLUES"] = 19)] = "ST_LOUIS_BLUES";
  TEAMS[(TEAMS["CALGARY_FLAMES"] = 20)] = "CALGARY_FLAMES";
  TEAMS[(TEAMS["COLORADO_AVALANCHE"] = 21)] = "COLORADO_AVALANCHE";
  TEAMS[(TEAMS["EDMONTON_OILERS"] = 22)] = "EDMONTON_OILERS";
  TEAMS[(TEAMS["VANCOUVER_CANUCKS"] = 23)] = "VANCOUVER_CANUCKS";
  TEAMS[(TEAMS["ANAHEIM_DUCKS"] = 24)] = "ANAHEIM_DUCKS";
  TEAMS[(TEAMS["DALLAS_STARS"] = 25)] = "DALLAS_STARS";
  TEAMS[(TEAMS["LOS_ANGELES_KINGS"] = 26)] = "LOS_ANGELES_KINGS";
  TEAMS[(TEAMS["SAN_JOSE_SHARKS"] = 28)] = "SAN_JOSE_SHARKS";
  TEAMS[(TEAMS["COLUMBUS_BLUE_JACKETS"] = 29)] = "COLUMBUS_BLUE_JACKETS";
  TEAMS[(TEAMS["MINNESOTA_WILD"] = 30)] = "MINNESOTA_WILD";
  TEAMS[(TEAMS["WINNIPEG_JETS"] = 52)] = "WINNIPEG_JETS";
  TEAMS[(TEAMS["ARIZONA_COYOTES"] = 53)] = "ARIZONA_COYOTES";
  TEAMS[(TEAMS["VEGAS_GOLDEN_KNIGHTS"] = 54)] = "VEGAS_GOLDEN_KNIGHTS";
})((TEAMS = exports.TEAMS || (exports.TEAMS = {})));
class Team {
  constructor(id) {
    this.id = id;
    this.client = new HttpClient_1.HttpClient();
  }
  getInfo() {
    return this.client.get(`/teams/${this.id}`).then(response => {
      if (!response || !response.teams.length) {
        return Promise.reject("Failed to get team info");
      }
      return response.teams[0];
    });
  }
  getRoster() {
    return this.client.get(`/teams/${this.id}/roster`).then(response => {
      return response.roster.map(player => new Player_1.Player(player));
    });
  }
  getSchedule({ startDate, endDate, season }) {
    return this.client
      .get(`/schedule`, {
        endDate: date_fns_1.format(endDate, "YYYY-MM-DD"),
        season,
        startDate: date_fns_1.format(startDate, "YYYY-MM-DD"),
        teamId: this.id
      })
      .then(response => {
        return response.dates.reduce((games, date) => {
          if (!date.games || !date.games.length) {
            return;
          }
          return [
            ...games,
            ...date.games.map(game => {
              game.gameDate = new Date(game.gameDate);
              return game;
            })
          ];
        }, []);
      });
  }
}
exports.Team = Team;
//# sourceMappingURL=index.js.map
