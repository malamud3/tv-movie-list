import { useInfiniteQuery } from '@tanstack/react-query';
import { API_tmdb } from '../../services/API_Tmdb';
import { tmdbActions } from '../../interface/Consts';
import { UnifiedMediaItem } from '../../interface/TmdbTypes';

export function usePaginatedContent(queryKey: [string, tmdbActions]) {
    return useInfiniteQuery<UnifiedMediaItem[], Error>({
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
        staleTime: 2 * 60 * 1000, // 2 minutes for content lists
        gcTime: 5 * 60 * 1000, // 5 minutes cache time
    });
}