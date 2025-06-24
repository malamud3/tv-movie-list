import { useCallback, useRef, useEffect } from 'react';

export function useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: {
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
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
                        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    },
                    {
                        threshold: 0.1,
                        root: null,
                    }
                );

                observerRef.current.observe(node);
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return { lastItemRef }
}