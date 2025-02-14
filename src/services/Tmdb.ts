
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

// type tmdbAPI<T> = {
//     getTrending(dataPage: number, genreFilter: number): Promise<T[]>;
//     getPopular(dataPage: number, genreFilter: number): Promise<T[]>;
//     getTopRated(dataPage: number, genreFilter: number): Promise<T[]>;
//     getUpcoming(dataPage: number, genreFilter: number): Promise<T[]>;
//     getRecentlyAdded(dataPage: number, genreFilter: number): Promise<T[]>;
//     doSearch(dataPage: number, query: string): Promise<T[]>;
// };

