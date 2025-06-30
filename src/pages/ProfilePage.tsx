import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <span className={styles.avatarIcon}>👤</span>
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.userName}>Welcome Back!</h1>
            <p className={styles.userSubtitle}>Manage your entertainment preferences</p>
          </div>
        </div>

        <div className={styles.sections}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>🎬 Watchlist</h2>
            <p className={styles.sectionDescription}>Your saved movies and shows</p>
            <div className={styles.comingSoon}>Coming Soon</div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>⭐ Favorites</h2>
            <p className={styles.sectionDescription}>Your top-rated content</p>
            <div className={styles.comingSoon}>Coming Soon</div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>📊 Statistics</h2>
            <p className={styles.sectionDescription}>Your viewing analytics</p>
            <div className={styles.comingSoon}>Coming Soon</div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>⚙️ Settings</h2>
            <p className={styles.sectionDescription}>Customize your experience</p>
            <div className={styles.comingSoon}>Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}
