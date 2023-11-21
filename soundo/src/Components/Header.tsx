import "../App.css";
import TopLogo from "/assets/Soundo logo alt.svg";
import { Link } from "react-router-dom";

type HeaderProps = {
  hideNav: () => void;
};

function Header({ hideNav }: HeaderProps) {
  return (
    <header>
      <div className="login">
        <Link to="Login" onClick={hideNav}>
          Login
        </Link>
        <span> | </span>
        <Link to="Register" onClick={hideNav}>
          Register
        </Link>
      </div>
      <div>
        <br />
        <Link to="/">
          <img src={TopLogo} alt="Soundo" className="logo" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
