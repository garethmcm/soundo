import "../App.css";
import TopLogo from "/assets/Soundo logo alt.svg";
import Homer from "/assets/house-fill.svg"
import { Link } from "react-router-dom";

type HeaderProps = {
  hideNav: () => void;
  showNav: () => void;
};

//header containing home screen button, app logo and login/register navigation. props above show and hide navBar depending on where user has clicked

function Header({ hideNav, showNav }: HeaderProps) {
  return (
    <header> 
      <div className="headerComponent">       
      <Link to="/">
    <img src={Homer} alt="Soundo" onClick={showNav}/>
      </Link>
      <div className="login">
        <Link to="Login" onClick={hideNav}>
          Login
        </Link>
        <span> | </span>
        <Link to="Register" onClick={hideNav}>
          Register
        </Link>
      </div>
      </div>
      <div className="logo">
        <Link to="/">
          <img src={TopLogo} alt="Soundo" onClick={showNav}/>
        </Link>
      </div>
    </header>
  );
}

export default Header;
