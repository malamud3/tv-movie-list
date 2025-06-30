import { useInfiniteQuery } from '@tanstack/react-query';
import { API_tmdb } from '../../services/API_Tmdb';
import { tmdbActions } from '../../interface/Consts';
import { UnifiedMediaItem } from '../../interface/TmdbTypes';

/**
 * Configuration options for the usePaginatedContent hook
 */
interface UsePaginatedContentOptions {
    /** Search query string for filtering content */
    query?: string;
    /** Whether the query should be enabled/active */
    enabled?: boolean;
}

/**
 * Custom hook for fetching paginated content with infinite scroll capabilities
 * 
 * @param queryKey - Tuple containing the query identifier and TMDB action
 * @param options - Configuration options for the query
 * @returns React Query infinite query result with paginated data
 */
export function usePaginatedContent<T extends UnifiedMediaItem = UnifiedMediaItem>(
    queryKey: [string, tmdbActions],
    options: UsePaginatedContentOptions = {}
) {
    const { query, enabled = true } = options;

    // Include query in cache key to ensure proper cache isolation for search results
    const fullQueryKey = query ? [...queryKey, query] : queryKey;

    return useInfiniteQuery<T[], Error>({
        queryKey: fullQueryKey,
        queryFn: ({ pageParam = 1, signal }) =>
            API_tmdb({
                signal,
                queryKey,
                dataPage: Number(pageParam),
                query,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            // Continue pagination if the last page has data
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        },
        // Cache configuration for optimal performance
        staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
        gcTime: 5 * 60 * 1000,    // Keep in cache for 5 minutes
        enabled,
    });
}