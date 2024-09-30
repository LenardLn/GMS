import { Link } from "react-router-dom";
// import GMSLogo from "../assets/GMS_logo.svg";
import "../css/navbar.css";
import "../css/important.css";

const NavBar = () => {
  return (
    <ul id="navbar">
      <li>
        <Link to="/">
          <img id="logo" src="/assets/GMS_logo.svg" alt="Site logo" />
        </Link>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/calculator">Calculator</Link>
      </li>
      <li>
        <Link to="/info">Support</Link>
      </li>
    </ul>
  );
};

export default NavBar;
