"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TMDB_1 = require("../template/flexmessage/TMDB");
const LineMessage_1 = require("../models/LineMessage");
const axios_1 = require("../http/axios");
class TMDBApiService {
    searchMovie(title, year = 0, primary_release_year = 0) {
        return axios_1.searchMovie(title, year, primary_release_year).then(rep => {
            try {
                return this.replaceTemplate(rep.data.results);
            }
            catch (err) {
                console.log("TMDB Api Error!! :", err);
                return;
            }
        });
    }
    replaceTemplate(results) {
        let str = "[";
        results.forEach(e => {
            let item = TMDB_1.tmdb()
                .replace('{~Image~}', `https://image.tmdb.org/t/p/original${e.poster_path}`)
                .replace('{~ID~}', e.id.toString())
                .replace('{~OriginalTitle~}', e.original_title)
                .replace('{~Title~}', e.title)
                .replace('{~Vote~}', e.vote_average.toString())
                .replace('{~ReleaseDate~}', e.release_date);
            str += item;
            if (results[results.length - 1] !== e) {
                str += ',';
            }
        });
        str += "]";
        return new Promise((res, rej) => {
            let result = {
                type: LineMessage_1.messageType.flexMessage,
                altText: "TMDB Flex Message",
                contents: {
                    type: LineMessage_1.messageType.flexCarousel,
                    contents: JSON.parse(str)
                }
            };
            res(result);
        });
    }
}
exports.default = TMDBApiService;
//# sourceMappingURL=TMDBApiService.js.map