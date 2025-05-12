import { NavLink } from 'react-router-dom';
import classes from './NavigationDetails.module.css';

function NavigationDetails() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shows"
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              Shows
            </NavLink>
          </li>
        </ul>
      </nav>
      <h1>Movie Details</h1>
    </header>
  );
}

export default NavigationDetails;
