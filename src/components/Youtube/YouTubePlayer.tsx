// components/YouTubePlayer.tsx
import { useState } from 'react';
import styles from './YouTubePlayer.module.css';

interface YouTubePlayerProps {
  url?: string;
  autoplay?: boolean;
  showControls?: boolean;
  isLoading?: boolean;
  error?: string | null;
  onLoadTrailer?: () => void;
}

const YouTubePlayer = ({
  url,
  autoplay = false,
  showControls = true,
  isLoading = false,
  error = null,
  onLoadTrailer,
}: YouTubePlayerProps) => {
  const [hasRequestedTrailer, setHasRequestedTrailer] = useState(false);

  const handleLoadTrailer = () => {
    setHasRequestedTrailer(true);
    onLoadTrailer?.();
  };

  const getEmbedUrl = (url: string) => {
    try {
      const videoId = new URL(url).searchParams.get('v');
      if (!videoId) return null;

      const params = new URLSearchParams({
        rel: '0',
        modestbranding: '1',
        controls: showControls ? '1' : '0',
        ...(autoplay && { autoplay: '1', mute: '1' }),
      });

      return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
    } catch {
      return null;
    }
  };

  // Show trailer button when no video loaded yet
  if (!hasRequestedTrailer && !url && !isLoading && !error) {
    return (
      <div className={styles.playerWrapper}>
        <button className={styles.trailerButton} onClick={handleLoadTrailer}>
          <span className={styles.playIcon}>▶</span>
          <span>Official Trailer</span>
        </button>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.playerWrapper}>
        <div className={styles.playerContainer}>
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Loading trailer...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.playerWrapper}>
        <div className={styles.playerContainer}>
          <div className={styles.errorOverlay}>
            <div className={styles.errorIcon}>⚠</div>
            <p className={styles.errorText}>{error}</p>
            <button className={styles.retryButton} onClick={onLoadTrailer}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show video player
  if (url) {
    const embedUrl = getEmbedUrl(url);
    if (!embedUrl) return null;

    return (
      <div className={styles.playerWrapper}>
        <div className={styles.playerContainer}>
          <iframe
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
            loading="lazy"
            title="YouTube Trailer"
          />
          <div className={styles.gradientOverlay} />
        </div>
      </div>
    );
  }

  return null;
};

export default YouTubePlayer;
