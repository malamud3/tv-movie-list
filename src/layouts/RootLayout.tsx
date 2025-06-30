import MainNavigation from '../components/MainNavigation/MainNavigation';
import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.css';

function RootLayout() {
  return (
    <div className={styles.rootLayout}>
      <MainNavigation />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
