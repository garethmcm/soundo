import "../App.css";
import { Link } from "react-router-dom";

// links to sections of app

function TopNav() {
  return (
      <nav className="navBar">
        <Link to="Background">Background</Link>
        <Link to="AudioBasics">Audio Basics</Link>
        <Link to="AdvancedTechniques">Advanced techniques</Link>
        <Link to="TipsTricks">Tips/Tricks</Link>
        <Link to="Forum">Forum</Link>
        <Link to="OtherResources">Other resources</Link>
      </nav>
  );
}

export default TopNav;