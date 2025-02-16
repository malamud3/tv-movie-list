import { API_TV, tmdbTypes } from '../interface/Consts'


export const basicformatUrl = (): string | undefined => {
    return '1' === tmdbTypes.MOVIES ? API_TV.Movies.getPopularMovies : API_TV.TVShows.getPopularTvShows;
}

export type formatUrlPageGanerProps = {
    url: string,
    page: number,
    gener: number
}

export const formatUrlPageGener = (props: formatUrlPageGanerProps): string => {

    let urlString = `${props.url}?page=${props.page}`;

    if (props.gener != -1) {
        urlString += `&with_genres=${props.gener}`
    }

    return urlString;
}