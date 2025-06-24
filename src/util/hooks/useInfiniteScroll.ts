import { useCallback, useRef, useEffect } from 'react';

interface UseInfiniteScrollProps {
    hasNextPage?: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
    threshold?: number;
}

export function useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold = 0.1,
}: UseInfiniteScrollProps) {
    const observerRef = useRef<IntersectionObserver | null>(null);

    const lastItemRef = useCallback(
        (node: HTMLLIElement | null) => {
            // Early return if conditions aren't met
            if (isFetchingNextPage || !hasNextPage || !node) {
                observerRef.current?.disconnect();
                return;
            }

            // Clean up previous observer
            observerRef.current?.disconnect();

            // Create new observer
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                },
                { threshold, root: null }
            );

            observerRef.current.observe(node);
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage, threshold]
    );

    useEffect(() => {
        return () => observerRef.current?.disconnect();
    }, []);

    return { lastItemRef };
}