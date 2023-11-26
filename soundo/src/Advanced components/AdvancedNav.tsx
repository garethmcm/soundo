import "../App.css";
import { Link } from "react-router-dom";

function TechniquesNav() {
  return (
    <>
      <div className="techniquesNav">
        <Link to="/AdvancedTechniques">Advanced stuff</Link>
        <Link to="/AdvancedTechniques/Distortion">Distortion</Link>
        <Link to="/AdvancedTechniques/Phase">Phase</Link>
        <Link to="/AdvancedTechniques/Multitrack">Multitrack</Link>
        <Link to="/AdvancedTechniques/ParallelRouting">Parallel routing</Link>
      </div>
    </>
  );
}

export default TechniquesNav;
