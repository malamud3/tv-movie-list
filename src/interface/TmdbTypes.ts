export type BaseShow = {
    id: number;
    poster_path: string;
    overview: string;
    genre_ids: number[];
};

export type Show = BaseShow & {
    title: string;
    original_title: string;
    release_date: string;
    vote_count: number;
    vote_average: number;
};

export type upComingShow = BaseShow & {
    first_air_date: string;
    name: string;
};

export type recentlyAddedMovie = BaseShow & {
    original_title: string;
    release_date: string;
};