const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";

export async function getYoutubeTrailer(movieTitle: string): Promise<string> {
    const url = new URL(YOUTUBE_SEARCH_URL);
    url.searchParams.append("part", "id");
    url.searchParams.append("q", `${movieTitle} trailer`);
    url.searchParams.append("type", "video");
    url.searchParams.append("videoDefinition", "high");
    url.searchParams.append("maxResults", "1");
    url.searchParams.append("key", API_KEY);

    const res = await fetch(url.toString());
    if (!res.ok) {
        throw new Error("Failed to fetch YouTube trailer");
    }

    const data = await res.json();
    const videoId = data?.items?.[0]?.id?.videoId;

    if (!videoId) {
        throw new Error("Trailer not found");
    }

    return `${YOUTUBE_WATCH_URL}${videoId}`;
}
