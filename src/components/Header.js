import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <ul className="headerNav">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signUp">Sign up</NavLink>
        </li>
        <li>Log out</li>
      </ul>
    </div>
  );
};

export default Header;
