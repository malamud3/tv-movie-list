type MovieCardProps = {
  posterPath: string;
  title: string;
};

export const ImgCell = ({ posterPath }: MovieCardProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div style={styles.card}>
      <img src={imageUrl} alt={'title'} style={styles.image} />
    </div>
  );
};

const styles = {
  card: {
    width: '200px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: 5,
  },
  image: {
    width: '100%',
  },
};

export default ImgCell;
