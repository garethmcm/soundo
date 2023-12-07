import "../App.css";
import React, { useEffect, useRef } from 'react';
import { FatOscillator } from 'tone';

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";
import { Frequency } from "tone/build/esm/core/type/Units";

const BackgroundSpiel: React.FC = () => {
  const fatty = useRef<FatOscillator | null>(null);

  useEffect(() => {
    fatty.current = new FatOscillator("A4", "sine").toDestination();
  });

const handlePlay = (note: string) => {
  if (fatty.current) {
    fatty.current.start().frequency.value = note;
  }
};

  const handleStop = () => {
    if (fatty.current) {
      fatty.current.stop();
    }
  };
  const adjustPitch = (frequency: Frequency) => {
    if (fatty.current) {
      fatty.current.frequency.value = frequency;
    }
  };


  return (
    <section>
      <h1>The background on sound</h1>
      <p>
        Sound is how the brain interprets vibrations that propagate as acoustic waves. It is measured in frequency represented by Hertz. Human hearing goes roughly from 20Hz to 16,000kHz.. To give an idea of what these frequencies sound like you can listen on the oscillators below which covers this spectrum of sound and beyond.
      </p>
      <div className="oscars">
      <div className="playerButtonBox">
        <div onClick={() => handlePlay("440")}>
          <img src={playButton} alt="Play" className="buttons" />
        </div>
        <div onClick={() => handleStop()}>
          <img src={stopButton} alt="Stop" className="buttons" />
        </div>
        <div className="paramDials">
        <div>100-800Hz</div>
        <input
          type="range"
          min="100"
          max="800"
          step="0.001"
          defaultValue="440"
          onChange={(e) =>
            adjustPitch(
              parseFloat(e.target.value)
              )}
        />
      </div>
      </div>
      <div>
      <div className="playerButtonBox">
        <div onClick={() => handlePlay("2000")}>
          <img src={playButton} alt="Play" className="buttons" />
        </div>
        <div onClick={() => handleStop()}>
          <img src={stopButton} alt="Stop" className="buttons" />
        </div>
        <div className="paramDials">
        <div>800-2000Hz</div>
        <input
          type="range"
          min="800"
          max="4000"
          step="0.001"
          defaultValue="2000"
          onChange={(e) =>
            adjustPitch(
              parseFloat(e.target.value)
              )}
        />
        </div>
      </div>
      </div>
      <div>
      <div className="playerButtonBox">
        <div onClick={() => handlePlay("10000")}>
          <img src={playButton} alt="Play" className="buttons" />
        </div>
        <div onClick={() => handleStop()}>
          <img src={stopButton} alt="Stop" className="buttons" />
        </div>
        <div className="paramDials">
        <div>4000-18000</div>
        <input
          type="range"
          min="4000"
          max="18000"
          step="0.001"
          defaultValue="10000"
          onChange={(e) =>
            adjustPitch(
              parseFloat(e.target.value)
              )}
        />
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}

export default BackgroundSpiel;
