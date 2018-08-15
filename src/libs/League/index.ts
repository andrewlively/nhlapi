import { format } from "date-fns";
import { IConferenceInfo } from "../../interfaces/IConferenceInfo";
import { IDivisionInfo } from "../../interfaces/IDivisionInfo";
import { IStanding } from "../../interfaces/IStanding";
import { ITeamInfo } from "../../interfaces/ITeamInfo";
import { ITeamRecord } from "../../interfaces/ITeamRecord";
import { HttpClient } from "../../utils/HttpClient";

export enum DIVISONS {
  ATLANTIC = 17,
  CENTRAL = 16,
  METROPOLITAN = 18,
  PACIFIC = 15
};

export enum CONFERENCES {
  EASTERN = 6,
  WESTERN = 5
};

export class League {
  private client: HttpClient;

  constructor() {
    this.client = new HttpClient();
  }

  public getTeams(params?: { ids?: number[] }): Promise<ITeamInfo[]> {
    const query: any = {};

    if (params && params.ids) {
      query.teamId = params.ids.join(",");
    }

    return this.client
      .get(`/teams`, query)
      .then((response: any) => {
        if (!response || !response.teams) {
          return Promise.reject("Failed to get teams");
        }

        return response.teams;
      });
  }

  public getDivisions(): Promise<IDivisionInfo[]> {
    return this.client
      .get(`/divisions`)
      .then((response: any) => {
        if (!response || !response.divisions) {
          return Promise.reject("Failed to get divisions");
        }

        return response.divisions;
      });
  }

  public getDivision(id: number): Promise<IDivisionInfo> {
    return this.client
      .get(`/divisions/${id}`)
      .then((response: any) => {
        if (!response || !response.divisions || !response.divisions.length) {
          return Promise.reject("Failed to get divisions");
        }

        return response.divisions[0];
      });
  }

  public getConferences(): Promise<IConferenceInfo[]> {
    return this.client
      .get(`/conferences`)
      .then((response: any) => {
        if (!response || !response.conferences) {
          return Promise.reject("Failed to get conferences");
        }

        return response.conferences;
      });
  }

  public getConference(id: number): Promise<IConferenceInfo> {
    return this.client
      .get(`/conferences/${id}`)
      .then((response: any) => {
        if (!response || !response.conferences || !response.conferences.length) {
          return Promise.reject("Failed to get conferences");
        }

        return response.conferences[0];
      });
  }

  public getStandings(params?: { season?: string, date?: Date }): Promise<IStanding[]> {
    const query: any = {};

    if (params && params.season) {
      query.season = params.season;
    }

    if (params && params.date) {
      query.date = format(params.date, "YYYY-MM-DD");
    }

    return this.client
      .get(`/standings`, query)
      .then((response: any) => {
        if (!response || !response.records || !response.records.length) {
          return Promise.reject("Failed to get standings");
        }

        return response.records.map((record: IStanding) => {
          record.teamRecords = record.teamRecords.map((teamRecord: ITeamRecord) => {
            teamRecord.lastUpdated = new Date(teamRecord.lastUpdated);

            return teamRecord;
          });

          return record;
        });
      });
  }

}