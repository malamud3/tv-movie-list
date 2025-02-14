
type Show = {
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

type upComingShow = {
    first_air_date: string;
    id: number;
    name: string;
    poster_path: string;
    overview: string;
    genre_ids: number[];
}

type recentlyAddedMovie = {
    id: number;
    original_title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    genre_ids: number[];
}

interface tmdbAPI {
    getTrending(dataPage: number, Ganerfilter: number): Promise<Show[]>;
    getPopular(dataPage: number, Ganerfilter: number): Promise<Show[]>;
    getTopRated(dataPage: number, Ganerfilter: number): Promise<Show[]>;
    getUpcoming(dataPage: number, Ganerfilter: number): Promise<upComingShow[]>;
    getRecentlyAdded(dataPage: number, Ganerfilter: number): Promise<Show[]>;
    doSearch(dataPage: number, query: string): Promise<Show[]>;
}