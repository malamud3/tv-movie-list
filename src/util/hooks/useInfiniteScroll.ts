import { useCallback, useRef, useEffect } from 'react';

export function useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    axis = 'Y', // Default to vertical scrolling
}: {
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
    axis?: 'X' | 'Y'; // Allow 'X' or 'Y' as valid values
}) {
    const observerRef = useRef<IntersectionObserver | null>(null);

    const lastItemRef = useCallback(
        (node: HTMLLIElement | null) => {
            if (isFetchingNextPage || !hasNextPage) return;

            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            if (node) {
                observerRef.current = new IntersectionObserver(
                    (entries) => {
                        const entry = entries[0];
                        const isIntersecting =
                            axis === 'X'
                                ? entry.intersectionRatio > 0 && entry.boundingClientRect.left < window.innerWidth
                                : entry.isIntersecting;

                        if (isIntersecting && hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    },
                    { threshold: 0.1 }
                );

                observerRef.current.observe(node);
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage, axis]
    );

    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return { lastItemRef };
}