import "../App.css";
import { Link } from "react-router-dom";

function TechniquesNav() {
  return (
    <>
      <div className="techniquesNav">
        <Link to="/AudioBasics">How sound works</Link>
        <Link to="/AudioBasics/Equalisation">Equalisation</Link>
        <Link to="/AudioBasics/Compression">Compression</Link>
        <Link to="/AudioBasics/Delay">Delay</Link>
        <Link to="/AudioBasics/Reverb">Reverb</Link>
      </div>
    </>
  );
}

export default TechniquesNav;
