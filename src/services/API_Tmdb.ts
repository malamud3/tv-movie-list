import { API_TV, tmdbActions } from '../interface/Consts';
import { formatUrlPageGener } from '../util/TmdbUrlFormating';

type tmdbAPIProps = {
    queryKey: string[];
    dataPage: number;
    genreFilter?: number;
    query?: string;
    signal?: AbortSignal;
};

export const API_tmdb = async (props: tmdbAPIProps) => {
    const { queryKey, dataPage, genreFilter = -1, query, signal } = props;
    const type = queryKey[0];
    const action = queryKey[1];

    async function getPopularMovies() {
        console.log(`2`);
        const url = API_TV.Movies.getPopularMovies;
        const formattedUrl = formatUrlPageGener({ url, page: dataPage, gener: genreFilter });
        console.log(`Fetching popular movies from URL: ${formattedUrl}`);
        const response = await fetch(formattedUrl, { signal });
        const data = await response.json();
        return data.results;
    }

    async function getPopularTvShows() {
        const url = API_TV.TvShows.getPopularTvShows;
        const formattedUrl = formatUrlPageGener({ url, page: dataPage, gener: genreFilter });
        console.log(`Fetching popular TV shows from URL: ${formattedUrl}`);
        const response = await fetch(formattedUrl, { signal });
        const data = await response.json();
        return data.results;
    }

    switch (type) {
        case 'MOVIES':
            switch (action) {
                case tmdbActions.getPopular:
                    return getPopularMovies();
                default:
                    throw new Error('Invalid action for MOVIES');
            }
        case 'TV_SHOWS':
            switch (action) {
                case tmdbActions.getPopular:
                    return getPopularTvShows();
                default:
                    throw new Error('Invalid action for TV_SHOWS');
            }
        default:
            throw new Error('Invalid type');
    }
};