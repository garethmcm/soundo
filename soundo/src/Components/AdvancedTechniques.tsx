import "../App.css";
import "../Audio components/AudioComponents.css";

import { Route, Routes } from "react-router-dom";

import AdvancedNav from "../Advanced components/AdvancedNav";
import AdvancedLanding from "../Advanced components/AdvancedLanding";
import Distortion from "../Advanced components/Distortion";
import Chorus from "../Advanced components/Chorus";
import PreReverb from "../Advanced components/PreReverb";
import ConvoReverb from "../Advanced components/ConvoReverb";

function AdvancedTechniques() {
  return (
    <div className="audioBasics">
      <div>
        <AdvancedNav />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<AdvancedLanding />} />
          <Route path="/Distortion" element={<Distortion />} />
          <Route path="/Chorus" element={<Chorus />} />
          <Route path="/PreReverb" element={<PreReverb />} />
          <Route path="/ConvoReverb" element={<ConvoReverb />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdvancedTechniques;
