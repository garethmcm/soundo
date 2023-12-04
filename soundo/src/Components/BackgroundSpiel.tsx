import "../App.css";
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";

// type interface declaration - required in typescript

interface OscillatorProps {
  type?: OscillatorType;
}

// state declarations

const BackgroundSpiel: React.FC<OscillatorProps> = ({ type = 'sine' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(1000);

  // declaration of new oscillator to audio source
  useEffect(() => {
    const synth = new Tone.Oscillator({
      type,
      frequency,
      volume: -5,
    }).toDestination();

    // allows change of frequency, indicated by slider
    const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFrequency = parseInt(e.target.value, 10);
      setFrequency(newFrequency);
      synth.frequency.value = newFrequency;
    };

    // toggle to start / stop audio
    const handleTogglePlay = () => {
      setIsPlaying(!isPlaying);

      if (!isPlaying) {
        synth.start();
      } else {
        synth.stop();
      }
    };

    const handleToggleStop = () => {
      setIsPlaying(false);
      synth.stop();
    };

    // Cleanup function to stop the synth when the component is unmounted
    return () => {
      synth.dispose();
    };

    // Empty dependency array means this effect will only run once after the initial render
  }, [type, frequency, isPlaying]);

  return (
    <section>
      <h1>The background on sound</h1>
      <p>
        Sound is how the brain interprets vibrations that propagate as acoustic waves. It is measured in frequency represented by Hertz. Human hearing goes roughly from 20Hz to 20,000kHz, although the upper end of this diminishes as we get older.
      </p>
      <div>
        <div onClick={() => handleTogglePlay()}>
          <img src={playButton} alt="Play" className="buttons" />
        </div>
        <div onClick={() => handleToggleStop()}>
          <img src={stopButton} alt="Stop" className="buttons" />
        </div>
        <input
          type="range"
          min="20"
          max="20000"
          step="1"
          value={frequency}
          onChange={handleFrequencyChange}
        />
        <span>{frequency} Hz </span>
      </div>
    </section>
  );
}

export default BackgroundSpiel;
