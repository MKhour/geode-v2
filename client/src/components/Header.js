import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="App">
        <h1>Welcome to Geode</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/journal">Journal</Link>
            </li>
          </ul>
        </nav>   
      </div>
    </>
  )
};

export default Header;




