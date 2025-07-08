import { TMDB_API_KEY } from '../interface/Consts';

export type FormatUrlPageGenreProps = {
    url: string;
    page: number;
    genre: number;
};

export const formatUrlPageGenre = (props: FormatUrlPageGenreProps): string => {
    // Add API key to the URL
    const connector = props.url.includes('?') ? '&' : '?';
    let urlString = `${props.url}${connector}api_key=${TMDB_API_KEY}&page=${props.page}`;

    if (props.genre !== -1) {
        urlString += `&with_genres=${props.genre}`;
    }

    return urlString;
};