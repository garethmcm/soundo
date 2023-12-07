import "../App.css";
import "../Audio components/AudioComponents.css";

import { Route, Routes } from "react-router-dom";

import AdvancedNav from "../Advanced components/AdvancedNav";
import AdvancedLanding from "../Advanced components/AdvancedLanding";
import Distortion from "../Advanced components/Distortion";
import Chorus from "../Advanced components/Chorus";
// import Envelope from "../Advanced components/Envelope";
// import ParallelRouting from "../Advanced components/ParallelRouting";

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
          {/* <Route path="/Envelope" element={<Envelope />} /> */}
          {/* <Route path="/ParallelRouting" element={<ParallelRouting />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default AdvancedTechniques;
