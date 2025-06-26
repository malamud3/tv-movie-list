import { UnifiedMediaItem } from '../interface/TmdbTypes';

/**
 * Gets the release date from either a movie or TV show
 * @param item - The media item (movie or TV show)
 * @returns The release date string or null if not available
 */
export const getMediaReleaseDate = (item: UnifiedMediaItem): string | null => {
  return item.release_date || item.first_air_date || null;
};

/**
 * Gets the title from either a movie or TV show
 * @param item - The media item (movie or TV show)
 * @returns The title string
 */
export const getMediaTitle = (item: UnifiedMediaItem): string => {
  return item.title || item.name || 'Unknown Title';
};

/**
 * Formats a date string to a more readable format
 * @param dateString - The date string (YYYY-MM-DD format)
 * @returns Formatted date string
 */
export const formatReleaseDate = (dateString: string | null): string => {
  if (!dateString) return 'TBA';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch {
    return dateString;
  }
};

/**
 * Gets formatted release year from media item
 * @param item - The media item
 * @returns The release year as string
 */
export const getMediaYear = (item: UnifiedMediaItem): string => {
  const dateString = getMediaReleaseDate(item);
  if (!dateString) return 'TBA';
  
  try {
    return new Date(dateString).getFullYear().toString();
  } catch {
    return 'TBA';
  }
};
