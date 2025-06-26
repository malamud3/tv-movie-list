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

export type recentlyAddedShow = BaseShow & {
    name: string;
    original_name: string;
    first_air_date: string;
};

export type MediaItem = Show | upComingShow | recentlyAddedShow;

export type UnifiedMediaItem = BaseShow & {
    title?: string;
    name?: string;
    original_title?: string;
    original_name?: string;
    release_date?: string;
    first_air_date?: string;
    vote_count?: number;
    vote_average?: number;
    media_type?: 'movie' | 'tv';
};