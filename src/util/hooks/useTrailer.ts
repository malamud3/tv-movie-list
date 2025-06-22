// hooks/useTrailer.ts
import { useQuery } from '@tanstack/react-query';
import { getYoutubeTrailer } from '../../services/API_Youtube';

interface UseTrailerOptions {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
}

export const useTrailer = (
    movieId: number | string,
    movieTitle: string,
    options: UseTrailerOptions = {}
) => {
    const {
        enabled = true,
        staleTime = 1000 * 60 * 30, // 30 minutes
        gcTime = 1000 * 60 * 60, // 1 hour
    } = options;

    return useQuery({
        queryKey: ['trailer', movieId, movieTitle],
        queryFn: () => getYoutubeTrailer(movieTitle),
        enabled: enabled && !!movieTitle,
        staleTime,
        gcTime,
        retry: 2,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        meta: {
            errorMessage: 'Failed to load trailer'
        }
    });
};