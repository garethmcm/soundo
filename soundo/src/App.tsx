import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import TopNav from "./Components/TopNav";
import Footer from "./Components/Footer";

import LandingSpiel from "./Components/LandingSpiel";
import AudioBasics from "./Audio components/AudioBasics";
import AdvancedTechniques from "./Components/AdvancedTechniques";
import BackgroundSpiel from "./Components/BackgroundSpiel";
import TipsTricksSpiel from "./Components/TipsTricksSpiel";
import Forum from "./Components/Forum";
import OtherResourcesSpiel from "./Components/OtherResourcesSpiel";

import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const hideNav = () => {
    setIsNavVisible(false);
  };

  const showNav = () => {
    setIsNavVisible(true);
  };

// app hierarchy, url routing handled

  return (
    <body>
      <Header hideNav={hideNav} showNav={showNav} />
      {isNavVisible && <TopNav />}
      <Routes>
        <Route path="/" element={<LandingSpiel />} />
        <Route path="/Background" element={<BackgroundSpiel />} />
        <Route path="/AudioBasics/*" element={<AudioBasics />} />
        <Route path="/AdvancedTechniques/*" element={<AdvancedTechniques />} />
        <Route path="/TipsTricks" element={<TipsTricksSpiel />} />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/OtherResources" element={<OtherResourcesSpiel />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
      </Routes>
      <Footer />
    </body>
  );
}

export default App;
