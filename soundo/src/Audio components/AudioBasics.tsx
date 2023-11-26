import "../App.css";
import "./AudioComponents.css";

import { Route, Routes } from "react-router-dom";

import TechniquesNav from "./TechniquesNav";
import AudioLanding from "./AudioLanding";
import Compression from "./Compression";
import Equalisation from "./Equalisation";
import Delay from "./Delay";
import Reverb from "./Reverb";
import ConvoReverb from "./ConvoReverb";

function AudioBasics() {
  return (
    <div className="audioBasics">
      <div>
        <TechniquesNav />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<AudioLanding />} />
          <Route path="/Compression" element={<Compression />} />
          <Route path="/Equalisation" element={<Equalisation />} />
          <Route path="/Delay" element={<Delay />} />
          <Route path="/Reverb" element={<Reverb />} />
          <Route path="/ConvoReverb" element={<ConvoReverb />} />
        </Routes>
      </div>
    </div>
  );
}

export default AudioBasics;
