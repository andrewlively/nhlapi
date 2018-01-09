"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("../../utils/HttpClient");
const Player_1 = require("../Player");
class Team {
    constructor(id) {
        this._id = id;
        this._client = new HttpClient_1.default();
    }
    roster() {
        return this._client
            .get(`/teams/${this._id}/roster`)
            .then((response) => {
            return response.roster.map((player) => new Player_1.default(player));
        });
    }
    schedule({ startDate, endDate, season }) {
        return this._client
            .get(`/schedule`, { startDate, endDate, season, teamId: this._id })
            .then((response) => {
            return response.dates;
        });
    }
}
exports.default = Team;
//# sourceMappingURL=index.js.map