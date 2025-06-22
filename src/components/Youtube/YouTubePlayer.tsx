// components/YouTubePlayer.tsx
import { useState } from 'react';
import styles from './YouTubePlayer.module.css';

type YouTubePlayerProps = {
  url?: string;
  autoplay?: boolean;
  showControls?: boolean;
  isLoading?: boolean;
  error?: string | null;
  onLoadTrailer?: () => void;
};

const YouTubePlayer = ({
  url,
  autoplay = false,
  showControls = true,
  isLoading = false,
  error = null,
  onLoadTrailer,
}: YouTubePlayerProps) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  // If no URL and not loading and button hasn't been clicked, show the button
  if (!url && !isLoading && !error && !buttonClicked) {
    return (
      <div className={styles.playerWrapper}>
        <button
          className={styles.trailerButton}
          onClick={() => {
            setButtonClicked(true);
            onLoadTrailer?.();
          }}
        >
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
            <div className={styles.spinner}></div>
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
            <button
              className={styles.retryButton}
              onClick={() => {
                onLoadTrailer?.();
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show video player if URL is available
  if (url) {
    const videoId = new URL(url).searchParams.get('v');
    if (!videoId) return null;

    // Enhanced embed URL with better parameters
    const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
    embedUrl.searchParams.set('rel', '0'); // Don't show related videos
    embedUrl.searchParams.set('modestbranding', '1'); // Minimal YouTube branding
    embedUrl.searchParams.set('fs', '1'); // Allow fullscreen
    embedUrl.searchParams.set('cc_load_policy', '0'); // Don't show captions by default
    embedUrl.searchParams.set('iv_load_policy', '3'); // Hide annotations
    embedUrl.searchParams.set('controls', showControls ? '1' : '0');
    if (autoplay) {
      embedUrl.searchParams.set('autoplay', '1');
      embedUrl.searchParams.set('mute', '1'); // Required for autoplay
    }

    return (
      <div className={styles.playerWrapper}>
        <div className={styles.playerContainer}>
          <iframe
            src={embedUrl.toString()}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={styles.iframe}
            loading="lazy"
          />
          {/* Gradient overlay for better visual integration */}
          <div className={styles.gradientOverlay} />
        </div>
      </div>
    );
  }

  return null;
};

export default YouTubePlayer;
