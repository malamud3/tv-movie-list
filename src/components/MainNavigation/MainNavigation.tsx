import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? '' : undefined)}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) => (isActive ? '' : undefined)}
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shows"
              className={({ isActive }) => (isActive ? '' : undefined)}
            >
              Shows
            </NavLink>
          </li>
        </ul>
        <ul className={`${classes.list} ${classes.end}`}>
          <li>category</li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? '' : undefined)}
              end
            >
              profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
