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
    // Add more sections here
];
