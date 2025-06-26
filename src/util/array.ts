import { UnifiedMediaItem } from "../interface/TmdbTypes";


export const chunkArray = <T>(array: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

export function flattenAndFilterShows(pages: { pages: UnifiedMediaItem[][] } | undefined): UnifiedMediaItem[] {
    return pages?.pages.flat().filter((item) => item.poster_path) || [];
}