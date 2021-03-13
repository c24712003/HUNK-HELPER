import axios from 'axios'
import config from '../config'

const wgerRequest = axios.create({
    baseURL: 'https://wger.de/api/v2',
    headers: { 'Authorization': config.wger.apiKey }
});

const tmdbRequest = axios.create({
    baseURL: `https://api.themoviedb.org/3/search/movie?api_key=${config.movie_tmdb.apiKey}&language=en-US`
})

export const getWorkoutAll = id => wgerRequest.get(`workout/${id}/canonical_representation/`);
export const getSchedule = () => wgerRequest.get('/schedule/');
export const getScheduleStep = () => wgerRequest.get('/schedulestep/');
export const getTrainingMenus = () => wgerRequest.get('/day/');
export const getSetList = () => wgerRequest.get('/set/');
export const getSetting = () => wgerRequest.get('/setting/');
export const searchMovie = (title, year, primary_release_year) => tmdbRequest.get(`&query=${encodeURI(title)}&page=1&include_adult=true&year=${year}&primary_release_year=${primary_release_year}`);

export const updateCurrentWeight = data => wgerRequest.post('/weightentry/', data);