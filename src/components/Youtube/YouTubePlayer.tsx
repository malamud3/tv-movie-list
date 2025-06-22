// components/YouTubePlayer.tsx
type YouTubePlayerProps = {
  url: string;
};

const YouTubePlayer = ({ url }: YouTubePlayerProps) => {
  const videoId = new URL(url).searchParams.get('v');

  if (!videoId) return null;

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default YouTubePlayer;
