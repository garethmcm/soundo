import "../App.css";
import { Link } from "react-router-dom";

function TechniquesNav() {
  return (
    <>
      <div className="techniquesNav">
        <Link to="/AdvancedTechniques">Advanced stuff</Link>
        <Link to="/AdvancedTechniques/Distortion">Distortion</Link>
        <Link to="/AdvancedTechniques/Chorus">Chorus</Link>
        <Link to="/AdvancedTechniques/PreReverb">Reverb with predelay</Link>
        <Link to="/AdvancedTechniques/ConvoReverb">Convolution Reverb</Link>
        {/* <Link to="/AdvancedTechniques/Envelope">Envelope</Link> */}
        {/* <Link to="/AdvancedTechniques/ParallelRouting">Parallel routing</Link> */}
      </div>
    </>
  );
}

export default TechniquesNav;
