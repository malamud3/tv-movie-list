import dotenv from 'dotenv';

dotenv.config();

export const SearchStrings = {
        searchPlaceHolder: "Search for a Movie or a Tv show"
};

const API_KEY = process.env.API_KEY;
const baseURL = "https://api.themoviedb.org/3/";
const imgURL = "https://image.tmdb.org/t/p/w500/";

export const API_TV = {
        API_KEY,
        baseURL,
        imgURL,

        Movies: {
                getGenreMoviesIndex: `${baseURL}movie/list?api_key=${API_KEY}&language=en-US`,
                getTrendingMovies: `${baseURL}trending/movie/day?api_key=${API_KEY}&language=en-US`,
                getUpcomingMovies: `${baseURL}movie/upcoming?api_key=${API_KEY}`,
                getPopularMovies: `${baseURL}movie/popular?api_key=${API_KEY}&language=en-US`,
                getTopRatedMovies: `${baseURL}movie/top_rated?api_key=${API_KEY}&language=en-US`,
                getRecentlyAddedMovies: `${baseURL}discover/movie?api_key=${API_KEY}&sort_by=release_date.desc&include_adult=false&page=1&year=2023`
        },

        TVshows: {
                getGenreTVshowsIndex: `${baseURL}movie/list?api_key=${API_KEY}&language=en-US`,
                getTrendingTvShows: `${baseURL}trending/tv/day?api_key=${API_KEY}&language=en-US`,
                getUpcomingTvShows: `${baseURL}discover/tv?api_key=${API_KEY}&include_null_first_air_dates=false&sort_by=first_air_date.desc&first_air_date.gte=`,
                getPopularTvShows: `${baseURL}tv/popular?api_key=${API_KEY}&language=en-US`,
                getTopRatedTvShows: `${baseURL}tv/top_rated?api_key=${API_KEY}&language=en-US`,
                getRecentlyAddedTvShows: `${baseURL}discover/tv?api_key=${API_KEY}&include_null_first_air_dates=false&sort_by=first_air_date.desc&first_air_date.lte=`
        },

        doSearchMovie: `${baseURL}search/movie?api_key=${API_KEY}&query=`,
        doSearchTv: `${baseURL}search/tv?api_key=${API_KEY}&query=`
};