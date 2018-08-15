"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const HttpClient_1 = require("../../utils/HttpClient");
var DIVISONS;
(function(DIVISONS) {
  DIVISONS[(DIVISONS["ATLANTIC"] = 17)] = "ATLANTIC";
  DIVISONS[(DIVISONS["CENTRAL"] = 16)] = "CENTRAL";
  DIVISONS[(DIVISONS["METROPOLITAN"] = 18)] = "METROPOLITAN";
  DIVISONS[(DIVISONS["PACIFIC"] = 15)] = "PACIFIC";
})((DIVISONS = exports.DIVISONS || (exports.DIVISONS = {})));
var CONFERENCES;
(function(CONFERENCES) {
  CONFERENCES[(CONFERENCES["EASTERN"] = 6)] = "EASTERN";
  CONFERENCES[(CONFERENCES["WESTERN"] = 5)] = "WESTERN";
})((CONFERENCES = exports.CONFERENCES || (exports.CONFERENCES = {})));
class League {
  constructor() {
    this.client = new HttpClient_1.HttpClient();
  }
  getTeams(params) {
    const query = {};
    if (params && params.ids) {
      query.teamId = params.ids.join(",");
    }
    return this.client.get(`/teams`, query).then(response => {
      if (!response || !response.teams) {
        return Promise.reject("Failed to get teams");
      }
      return response.teams;
    });
  }
  getDivisions() {
    return this.client.get(`/divisions`).then(response => {
      if (!response || !response.divisions) {
        return Promise.reject("Failed to get divisions");
      }
      return response.divisions;
    });
  }
  getDivision(id) {
    return this.client.get(`/divisions/${id}`).then(response => {
      if (!response || !response.divisions || !response.divisions.length) {
        return Promise.reject("Failed to get divisions");
      }
      return response.divisions[0];
    });
  }
  getConferences() {
    return this.client.get(`/conferences`).then(response => {
      if (!response || !response.conferences) {
        return Promise.reject("Failed to get conferences");
      }
      return response.conferences;
    });
  }
  getConference(id) {
    return this.client.get(`/conferences/${id}`).then(response => {
      if (!response || !response.conferences || !response.conferences.length) {
        return Promise.reject("Failed to get conferences");
      }
      return response.conferences[0];
    });
  }
  getStandings(params) {
    const query = {};
    if (params && params.season) {
      query.season = params.season;
    }
    if (params && params.date) {
      query.date = date_fns_1.format(params.date, "YYYY-MM-DD");
    }
    return this.client.get(`/standings`, query).then(response => {
      if (!response || !response.records || !response.records.length) {
        return Promise.reject("Failed to get standings");
      }
      return response.records.map(record => {
        record.teamRecords = record.teamRecords.map(teamRecord => {
          teamRecord.lastUpdated = new Date(teamRecord.lastUpdated);
          return teamRecord;
        });
        return record;
      });
    });
  }
}
exports.League = League;
//# sourceMappingURL=index.js.map
