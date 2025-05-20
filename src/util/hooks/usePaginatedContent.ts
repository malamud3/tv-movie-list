import { useInfiniteQuery } from '@tanstack/react-query';
import { API_tmdb } from '../../services/API_Tmdb';
import { tmdbActions } from '../../interface/Consts';
import { Show } from '../../interface/TmdbTypes';

export function usePaginatedContent(queryKey: [string, tmdbActions]) {
    return useInfiniteQuery<Show[], Error>({
        queryKey,
        queryFn: ({ pageParam = 1, signal }) =>
            API_tmdb({
                signal,
                queryKey,
                dataPage: Number(pageParam),
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length > 0 ? allPages.length + 1 : undefined,
    });
}