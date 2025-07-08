export const SearchStrings: { searchPlaceHolder: string } = {
        searchPlaceHolder: "Search for a Movie or a Tv show"
};

// Get API key and validate it
const API_KEY: string = import.meta.env.VITE_API_KEY || '';

if (!API_KEY) {
        console.error('VITE_API_KEY is not defined in the environment variables');
        console.error('Please set VITE_API_KEY in your environment variables');
        throw new Error('API_KEY is not defined in the environment variables');
}

// Export the API key for use in other modules
export const TMDB_API_KEY = API_KEY;

const baseURL = "https://api.themoviedb.org/3/";
const imgURL = "https://image.tmdb.org/t/p/w500/";

// Define URLs without API key - will be added dynamically
const Movies = {
        getGenreMoviesIndex: `${baseURL}movie/list?language=en-US`,
        getTrendingMovies: `${baseURL}trending/movie/day?language=en-US`,
        getUpcomingMovies: `${baseURL}movie/upcoming`,
        getPopularMovies: `${baseURL}movie/popular?language=en-US`,
        getTopRatedMovies: `${baseURL}movie/top_rated?language=en-US`,
        getRecentlyAddedMovies: `${baseURL}discover/movie?sort_by=release_date.desc&include_adult=false&page=1&year=2025`
};

const TvShows = {
        getGenreTVshowsIndex: `${baseURL}movie/list?language=en-US`,
        getTrendingTvShows: `${baseURL}trending/tv/day?language=en-US`,
        getUpcomingTvShows: `${baseURL}discover/tv?include_null_first_air_dates=false&sort_by=first_air_date.desc&first_air_date.gte=`,
        getPopularTvShows: `${baseURL}tv/popular?language=en-US`,
        getTopRatedTvShows: `${baseURL}tv/top_rated?language=en-US`,
        getRecentlyAddedTvShows: `${baseURL}discover/tv?include_null_first_air_dates=false&sort_by=first_air_date.desc&first_air_date.lte=`
};

export const API_TV = {
        TMDB_API_KEY,
        baseURL,
        imgURL,
        Movies,
        TvShows,
        doSearchMovie: `${baseURL}search/movie?query=`,
        doSearchTv: `${baseURL}search/tv?query=`
};

export const TV_genres: { [key: number]: string } = {
        10759: "Action & Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        9648: "Mystery",
        10765: "Science Fiction",
        37: "Western",
        10768: "War & Politics"
};

export const Movie_genres: { [key: number]: string } = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        37: "Western"
};


export enum tmdbActions {
        getPopular = 'getPopular',
        getTrending = 'getTrending',
        getUpcoming = 'getUpcoming',
        getTopRated = 'getTopRated',
        getRecentlyAdded = 'getRecentlyAdded',
        search = 'search'
}