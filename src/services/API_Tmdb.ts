import { API_TV, tmdbActions } from '../interface/Consts';
import { formatUrlPageGener } from '../util/TmdbUrlFormating';

type TmdbAPIProps = {
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

// const getPopularMovies = async (dataPage: number, genreFilter: number, signal?: AbortSignal) => {
//     const url = API_TV.Movies.getPopularMovies;
//     const formattedUrl = formatUrlPageGener({ url, page: dataPage, gener: genreFilter });
//     return fetchFromTmdb(formattedUrl, signal);
// };

// const getPopularTvShows = async (dataPage: number, genreFilter: number, signal?: AbortSignal) => {
//     const url = API_TV.TvShows.getPopularTvShows;
//     const formattedUrl = formatUrlPageGener({ url, page: dataPage, gener: genreFilter });
//     return fetchFromTmdb(formattedUrl, signal);
// };


const getPopular = async (type: 'MOVIES' | 'TV_SHOWS', options: TmdbAPIProps) => {
    const url = type === 'MOVIES'
        ? API_TV.Movies.getPopularMovies
        : API_TV.TvShows.getPopularTvShows;

    const formattedUrl = formatUrlPageGener({
        url,
        page: options.dataPage,
        gener: options.genreFilter ?? -1
    });

    return fetchFromTmdb(formattedUrl, options.signal);
}
const getTrending = async (type: 'MOVIES' | 'TV_SHOWS', options: TmdbAPIProps) => {
    const url = type === 'MOVIES'
        ? API_TV.Movies.getTrendingMovies
        : API_TV.TvShows.getTrendingTvShows;

    const formattedUrl = formatUrlPageGener({ url, page: options.dataPage, gener: options.genreFilter ?? -1 });
    return fetchFromTmdb(formattedUrl, options.signal);
};

const getTopRated = async (type: 'MOVIES' | 'TV_SHOWS', options: TmdbAPIProps) => {
    const url = type === 'MOVIES'
        ? API_TV.Movies.getTopRatedMovies
        : API_TV.TvShows.getTopRatedTvShows;

    const formattedUrl = formatUrlPageGener({ url, page: options.dataPage, gener: options.genreFilter ?? -1 });
    return fetchFromTmdb(formattedUrl, options.signal);
}

// const getUpcoming = async (type: 'MOVIES' | 'TV_SHOWS', dataPage: number, genreFilter: number, signal?: AbortSignal) => {
//     const url = type === 'MOVIES'
//         ? API_TV.Movies.getUpcomingMovies
//         : API_TV.TvShows.getUpcomingTvShows;

//     const formattedUrl = formatUrlPageGener({ url, page: dataPage, gener: genreFilter });
//     const data = await fetchFromTmdb(formattedUrl, signal);

//     return type === 'MOVIES'
//         ? mapShowsToUpcomingShows(data.results as Show[])
//         : data.results as upComingShow[];
// };

// const getRecentlyAdded = async (type: 'MOVIES' | 'TV_SHOWS', dataPage: number, genreFilter: number, signal?: AbortSignal) => {
//     const url = type === 'MOVIES'
//         ? API_TV.Movies.getRecentlyAddedMovies
//         : API_TV.TvShows.getRecentlyAddedTvShows;

//     const formattedUrl = formatUrlPageGener({ url, page: dataPage, gener: genreFilter });
//     const data = await fetchFromTmdb(formattedUrl, signal);

//     return type === 'MOVIES'
//         ? mapRecentlyAddedMovieToShows(data.results as recentlyAddedMovie[])
//         : data.results as Show[];
// };

const doSearch = async (type: 'MOVIES' | 'TV_SHOWS', query: string, dataPage: number, signal?: AbortSignal) => {
    const url = type === 'MOVIES'
        ? `${API_TV.doSearchMovie}${encodeURIComponent(query)}&page=${dataPage}`
        : `${API_TV.doSearchTv}${encodeURIComponent(query)}&page=${dataPage}`;

    return fetchFromTmdb(url, signal);
};




export const API_tmdb = async (props: TmdbAPIProps) => {
    const { queryKey, dataPage = 1, genreFilter = -1, query, signal } = props;
    const [type, action] = queryKey;

    if (type !== 'MOVIES' && type !== 'TV_SHOWS') {
        throw new Error('Invalid type - must be "MOVIES" or "TV_SHOWS"');
    }

    const options = { queryKey, dataPage, genreFilter, query, signal };

    switch (action) {
        case tmdbActions.getTrending:
            return getTrending(type, options);
        case tmdbActions.getPopular:
            return getPopular(type, options);
        case tmdbActions.getTopRated:
            return getTopRated(type, options);
        case tmdbActions.getUpcoming:
            // return getUpcoming(type, options);
            throw new Error('getUpcoming is not implemented');
        case tmdbActions.getRecentlyAdded:
            // return getRecentlyAdded(type, options);
            throw new Error('getRecentlyAdded is not implemented');
        default:
            if (action === 'search' && query) {
                return doSearch(type, query, dataPage, signal);
            }
            throw new Error(`Invalid action: ${action}`);
    }
};