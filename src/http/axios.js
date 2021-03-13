"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrentWeight = exports.searchMovie = exports.getSetting = exports.getSetList = exports.getTrainingMenus = exports.getScheduleStep = exports.getSchedule = exports.getWorkoutAll = void 0;
const axios_1 = require("axios");
const config_1 = require("../config");
const wgerRequest = axios_1.default.create({
    baseURL: 'https://wger.de/api/v2',
    headers: { 'Authorization': config_1.default.wger.apiKey }
});
const tmdbRequest = axios_1.default.create({
    baseURL: `https://api.themoviedb.org/3/search/movie?api_key=${config_1.default.movie_tmdb.apiKey}&language=en-US`
});
const getWorkoutAll = id => wgerRequest.get(`workout/${id}/canonical_representation/`);
exports.getWorkoutAll = getWorkoutAll;
const getSchedule = () => wgerRequest.get('/schedule/');
exports.getSchedule = getSchedule;
const getScheduleStep = () => wgerRequest.get('/schedulestep/');
exports.getScheduleStep = getScheduleStep;
const getTrainingMenus = () => wgerRequest.get('/day/');
exports.getTrainingMenus = getTrainingMenus;
const getSetList = () => wgerRequest.get('/set/');
exports.getSetList = getSetList;
const getSetting = () => wgerRequest.get('/setting/');
exports.getSetting = getSetting;
const searchMovie = (title, year, primary_release_year) => tmdbRequest.get(`&query=${encodeURI(title)}&page=1&include_adult=true&year=${year}&primary_release_year=${primary_release_year}`);
exports.searchMovie = searchMovie;
const updateCurrentWeight = data => wgerRequest.post('/weightentry/', data);
exports.updateCurrentWeight = updateCurrentWeight;
//# sourceMappingURL=axios.js.map