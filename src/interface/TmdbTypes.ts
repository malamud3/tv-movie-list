import { tmdbTypes } from './Consts'

export type Show = {
    id: number;
    title: string;
    original_title: string;
    poster_path: string;
    overview: string;
    vote_count: number;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}

export type upComingShow = {
    first_air_date: string;
    id: number;
    name: string;
    poster_path: string;
    overview: string;
    genre_ids: number[];
}

export type recentlyAddedMovie = {
    id: number;
    original_title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    genre_ids: number[];
}