import { NavLink } from 'react-router-dom';
import { useState, useCallback } from 'react';
import styles from './MainNavigation.module.css';

// Navigation items configuration - easy to maintain and extend
interface NavigationItem {
  path: string;
  label: string;
  end?: boolean;
  icon: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { path: '/', label: 'Home', end: true, icon: '🏠' },
  { path: '/movies', label: 'Movies', icon: '🎬' },
  { path: '/shows', label: 'Shows', icon: '📺' },
  { path: '/search', label: 'Search', icon: '🔍' },
  { path: '/favorites', label: 'Favorites', icon: '⭐' },
];

const USER_NAVIGATION_ITEMS: NavigationItem[] = [
  { path: '/profile', label: 'Profile', end: true, icon: '👤' },
];

// Reusable NavItem component to reduce code duplication
interface NavItemProps {
  item: NavigationItem;
  onClick?: () => void;
  className?: string;
}

const NavItem = ({ item, onClick, className }: NavItemProps) => (
  <li>
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `${styles.navLink} ${isActive ? styles.active : ''} ${className || ''}`
      }
      end={item.end}
      onClick={onClick}
    >
      <span className={styles.navIcon}>{item.icon}</span>
      {item.label}
    </NavLink>
  </li>
);

// Reusable NavList component
interface NavListProps {
  items: NavigationItem[];
  onItemClick?: () => void;
  className?: string;
}

const NavList = ({ items, onItemClick, className }: NavListProps) => (
  <ul className={`${styles.navList} ${className || ''}`}>
    {items.map((item) => (
      <NavItem key={item.path} item={item} onClick={onItemClick} />
    ))}
  </ul>
);

function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Brand Section */}
        <div className={styles.navSection}>
          <NavLink to="/" className={styles.brand} onClick={closeMobileMenu}>
            CineVault
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className={`${styles.navSection} ${styles.desktopOnly}`}>
          <NavList items={NAVIGATION_ITEMS} />
        </div>

        {/* User Section - Desktop */}
        <div className={`${styles.navSection} ${styles.desktopOnly}`}>
          <div className={styles.userSection}>
            <span className={styles.category}>My Watchlist</span>
            <NavList items={USER_NAVIGATION_ITEMS} />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ''
        }`}
      >
        <NavList
          items={[...NAVIGATION_ITEMS, ...USER_NAVIGATION_ITEMS]}
          onItemClick={closeMobileMenu}
          className={styles.mobileNavList}
        />
      </div>
    </header>
  );
}

export default MainNavigation;
