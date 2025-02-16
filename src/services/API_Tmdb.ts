import { API_TV, tmdbTypes } from '../interface/Consts';
import { formatUrlPageGener } from '../util/TmdbUrlFormating'

type tmdbAPIProps = {
    type: tmdbTypes,
    dataPage: number;
    genreFilter?: number;
    query?: string;
};

export const API_tmdb = async (props: tmdbAPIProps): Promise<unknown> => {
    const { type, dataPage, genreFilter = -1, query } = props;

    async function getPopular() {
        let url = '';
        switch (type) {
            case tmdbTypes.MOVIES:
                url = API_TV.Movies.getPopularMovies;
                break;
            case tmdbTypes.TV_SHOWS:
                url = API_TV.TvShows.getPopularTvShows;
                break;
            // Add more cases as needed
            default:
                throw new Error('Invalid type');
        }
        const formattedUrl = formatUrlPageGener({ url, page: dataPage, gener: genreFilter });
        const response = await fetch(formattedUrl);
        const data = await response.json();
        return data.results;
    }

    async function fetchData() {
        return await getPopular();
    }

    return fetchData();
}