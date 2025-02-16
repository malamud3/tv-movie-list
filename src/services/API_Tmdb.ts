import { API_TV } from '../interface/Consts';
import { tmdbAPI, Show } from '../interface/TmdbTypes';


type tmdbAPIProps = {
    dataPage: number;
    genreFilter?: number;
    query?: string;
};


export const API_tmdb = async (): Promise<tmdbAPIProps> => {

    async function fetchMovies() {
        console.log(API_TV.Movies.getPopularMovies);
        const response = await fetch(API_TV.Movies.getPopularMovies);
        const data = await response.json();
        return data.results;
    }
}