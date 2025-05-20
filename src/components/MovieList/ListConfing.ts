import { tmdbActions } from '../../interface/Consts';

export const ListConfing = [
    {
        id: 'MOVIES',
        title: 'Popular Movies',
        fetchFunction: tmdbActions.getPopular,
    },
    {
        id: 'TV_SHOWS',
        title: 'Popular TV Shows',
        fetchFunction: tmdbActions.getPopular,
    },
    {
        id: 'MOVIES',
        title: 'Trending Movies',
        fetchFunction: tmdbActions.getTrending,
    },
    {
        id: 'TV_SHOWS',
        title: 'Trending TV Shows',
        fetchFunction: tmdbActions.getTrending,
    },
    {
        id: 'MOVIES',
        title: 'Top Rated Movies',
        fetchFunction: tmdbActions.getTopRated,
    },
    {
        id: 'TV_SHOWS',
        title: 'Top Rated TV Shows',
        fetchFunction: tmdbActions.getTopRated,
    },
];