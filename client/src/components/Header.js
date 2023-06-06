import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="nav App">
      <ul>
        <Link to="/" className="link nav-title">geode</Link>
        <Link to="/journal" className="link">Journal</Link>
      </ul>
    </nav>
  )
};

export default Header;




