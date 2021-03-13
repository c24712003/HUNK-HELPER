import { ITMDB, Result } from '../interfaces/ITMDB';
import { tmdb } from '../template/flexmessage/TMDB';
import { LineFlexMessage, LineMessageItems, messageType } from '../models/LineMessage';
import { searchMovie } from '../http/axios';
import config from '../config';

export default class TMDBApiService {
    searchMovie(title: string, year: number = 0, primary_release_year: number = 0): Promise<LineFlexMessage> {
        return searchMovie(title, year, primary_release_year).then(rep => {
            try {
                return this.replaceTemplate((rep.data as ITMDB).results);
            } catch (err) {
                console.log("TMDB Api Error!! :", err);
                return;
            }
        })
    }

    private replaceTemplate(results: Result[]): Promise<LineFlexMessage> {
        let str: string = "[";

        results.forEach(e => {
            let item = tmdb()
                .replace('{~Image~}', `https://image.tmdb.org/t/p/original${e.poster_path}`)
                .replace('{~ID~}', e.id.toString())
                .replace('{~OriginalTitle~}', e.original_title)
                .replace('{~Title~}', e.title)
                .replace('{~Vote~}', e.vote_average.toString())
                .replace('{~ReleaseDate~}', e.release_date);

            str += item;

            if (results[results.length - 1] !== e) {
                str += ','
            }
        });

        str += "]"

        return new Promise((res, rej) => {
            let result: LineFlexMessage = {
                type: messageType.flexMessage,
                altText: "TMDB Flex Message",
                contents: {
                    type: messageType.flexCarousel,
                    contents: JSON.parse(str)
                }
            };

            res(result);
        })
    }
}