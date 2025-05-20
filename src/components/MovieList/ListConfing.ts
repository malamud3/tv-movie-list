import { tmdbActions } from '../../interface/Consts';

export const ListConfing = [
    {
        id: 1.1,
        type: 'MOVIES',
        title: 'Popular Movies',
        fetchFunction: tmdbActions.getPopular,
    },
    {
        id: 2.1,
        type: 'TV_SHOWS',
        title: 'Popular TV Shows',
        fetchFunction: tmdbActions.getPopular,
    },
    {
        id: 1.2,
        type: 'MOVIES',
        title: 'Trending Movies',
        fetchFunction: tmdbActions.getTrending,
    },
    {
        id: 2.2,
        type: 'TV_SHOWS',
        title: 'Trending TV Shows',
        fetchFunction: tmdbActions.getTrending,
    },
    {
        id: 1.3,
        type: 'MOVIES',
        title: 'Top Rated Movies',
        fetchFunction: tmdbActions.getTopRated,
    },
    {
        id: 2.3,
        type: 'TV_SHOWS',
        title: 'Top Rated TV Shows',
        fetchFunction: tmdbActions.getTopRated,
    },
];