"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const querystring_1 = require("querystring");
class HttpClient {
    constructor() {
        this._baseUrl = "https://statsapi.web.nhl.com/api/v1";
    }
    get(endpoint, query) {
        return new Promise((resolve, reject) => {
            let url = `${this._baseUrl}${endpoint}`;
            if (query && Object.keys(query).length) {
                url += `?${querystring_1.stringify(query)}`;
            }
            https
                .get(url, (response) => {
                let data = "";
                response.on("data", (chunk) => (data += chunk));
                response.on("end", () => resolve(JSON.parse(data)));
            })
                .on("error", (err) => reject(err));
        });
    }
}
exports.default = HttpClient;
//# sourceMappingURL=index.js.map