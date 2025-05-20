import { API_TV, tmdbActions } from '../interface/Consts';
import { formatUrlPageGener } from '../util/TmdbUrlFormating';

type tmdbAPIProps = {
    queryKey: readonly [string, tmdbActions];
    dataPage: number;
    genreFilter?: number;
    query?: string;
    signal?: AbortSignal;
};

const fetchFromTmdb = async (url: string, signal?: AbortSignal) => {
    const response = await fetch(url, { signal });
    if (!response.ok) {
        throw new Error(`Failed to fetch data from TMDB: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
};

const getPopularMovies = async (dataPage: number, genreFilter: number, signal?: AbortSignal) => {
    const url = API_TV.Movies.getPopularMovies;
    const formattedUrl = formatUrlPageGener({ url, page: dataPage, gener: genreFilter });
    return fetchFromTmdb(formattedUrl, signal);
};

const getPopularTvShows = async (dataPage: number, genreFilter: number, signal?: AbortSignal) => {
    const url = API_TV.TvShows.getPopularTvShows;
    const formattedUrl = formatUrlPageGener({ url, page: dataPage, gener: genreFilter });
    console.log(`Fetching popular TV shows from URL: ${formattedUrl}`);
    return fetchFromTmdb(formattedUrl, signal);
};

export const API_tmdb = async (props: tmdbAPIProps) => {
    const { queryKey, dataPage = 1, genreFilter = -1, signal } = props;
    const [type, action] = [...queryKey];


    if (type === 'MOVIES') {
        if (action === tmdbActions.getPopular) {
            return getPopularMovies(dataPage, genreFilter, signal);
        } else {
            throw new Error('Invalid action for MOVIES');
        }
    } else if (type === 'TV_SHOWS') {
        if (action === tmdbActions.getPopular) {
            return getPopularTvShows(dataPage, genreFilter, signal);
        } else {
            throw new Error('Invalid action for TV_SHOWS');
        }
    } else {
        throw new Error('Invalid type');
    }
};