import "./AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, EQ3 } from "tone";

import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
import guitar from "/assets/AUDIO SAMPLES/GUITAR.mp3";
import bass from "/assets/AUDIO SAMPLES/BASS.mp3";
import drums from "/assets/AUDIO SAMPLES/DRUMS.mp3";
import piano from "/assets/AUDIO SAMPLES/PIANO.mp3";
import vocals from "/assets/AUDIO SAMPLES/VOCAL WITH VERB.mp3";

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";
import { Frequency } from "tone/build/esm/core/type/Units";

interface EqItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

const eqPlaylist: EqItems[] = [
  { noteAllocation: "C4", fileLocation: sunshine, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: guitar, sampleTitle: "Guitar" },
  { noteAllocation: "E4", fileLocation: bass, sampleTitle: "Bass" },
  { noteAllocation: "F4", fileLocation: drums, sampleTitle: "Drums" },
  { noteAllocation: "G4", fileLocation: piano, sampleTitle: "Piano" },
  { noteAllocation: "A5", fileLocation: vocals, sampleTitle: "Vocals" },
];

// initialises states

const Equalizer: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const eq = useRef<EQ3 | null>(null);
  // const [lowFrequency, setLowFrequency] = useState(0);
  // const [highFrequency, setHighFrequency] = useState(0);

  useEffect(() => {
    sampler.current = new Sampler(
      Object.fromEntries(
        eqPlaylist.map((item) => [item.noteAllocation, item.fileLocation])
      ),
      {
        onload: () => {
          setLoaded(true);
        },
      }
    );

    eq.current = new EQ3({
      low: 1,
      mid: 1,
      high: 1,
      lowFrequency: 400,
      highFrequency: 2500,
    }).toDestination();

    if (sampler.current && eq.current) {
      sampler.current.connect(eq.current);
    }

    return () => {
      if (sampler.current) {
        sampler.current.dispose();
      }
      if (eq.current) {
        eq.current.dispose();
      }
    };
  }, []);

  const handlePlay = (note: string) => {
    if (isLoaded && sampler.current) {
      sampler.current.triggerAttack(note);
    }
  };

  const handleStop = (note: string) => {
    if (sampler.current) {
      sampler.current.triggerRelease(note);
    }
  };

  const adjustEQ = (low: number, mid: number, high: number, lowFreq: Frequency, highFreq: Frequency) => {
    if (eq.current) {
      eq.current.low.value = low;
      eq.current.mid.value = mid;
      eq.current.high.value = high;
      eq.current.lowFrequency.value = lowFreq;
      eq.current.highFrequency.value = highFreq;
      
    }
  };


  return (
    <div>
      <h1>Equalizer</h1>
      <p className="blurb">This allows you to boost different parts of a sound, separated into low frequencies, mid frequencies and high frequencies</p>
      <div className="audioComponentDisplay">
        <div className="playerButtonBox">
          <div>
            {eqPlaylist.map((item) => (
              <div className="playerButtonBox" key={item.noteAllocation}>
                <h2 className="sampleTitle">{item.sampleTitle}</h2>
                <div
                  onClick={() => isLoaded && handlePlay(item.noteAllocation)}
                >
                  <img src={playButton} alt="Play" className="buttons" />
                </div>
                <div
                  onClick={() => isLoaded && handleStop(item.noteAllocation)}
                >
                  <img src={stopButton} alt="Stop" className="buttons" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="paramDials">
          <div className="buttonSection">
          <label>
            Low: <br />
            <input
              type="range"
              min="-10"
              max="10"
              step="0.3"
              defaultValue="0"
              onChange={(e) =>
                adjustEQ(
                  parseFloat(e.target.value),
                  eq.current?.mid.value || 0,
                  eq.current?.high.value || 0,
                  eq.current?.lowFrequency.value || 400,
                  eq.current?.highFrequency.value || 2500
                )
              }
            />
          </label>
          <div className="explainer">Used to give sounds more weight, too much can sound boomy</div>
          </div>
          <div className="buttonSection">
          <label>
            Frequency selector: <br />
            <input
              type="range"
              min="60"
              max="1000"
              step="1"
              defaultValue="0"
              onChange={(e) =>
                adjustEQ(
                  eq.current?.low.value || 0,
                  eq.current?.mid.value || 0,
                  eq.current?.high.value || 0,
                  parseFloat(e.target.value),
                  eq.current?.highFrequency.value || 2500
                )
              }
            />
          </label>
          <div className="explainer">Higher will sound more "chesty", lower for deeper sound</div>
        </div>
          <div className="buttonSection">
          <label>
            Mid: <br />
            <input
              type="range"
              min="-10"
              max="10"
              step="0.3"
              defaultValue="0"
              onChange={(e) =>
                adjustEQ(
                  eq.current?.low.value || 0,
                  parseFloat(e.target.value),
                  eq.current?.high.value || 0,
                  eq.current?.lowFrequency.value || 400,
                  eq.current?.highFrequency.value || 2500
                )
              }
            />
          </label>
          <div className="explainer">Used for more definition, too much can sound grating</div>
          </div>
          <div className="buttonSection">
          <label>
            High: <br />
            <input
              type="range"
              min="-10"
              max="10"
              step="0.3"
              defaultValue="0"
              onChange={(e) =>
                adjustEQ(
                  eq.current?.low.value || 0,
                  eq.current?.mid.value || 0,
                  parseFloat(e.target.value),
                  eq.current?.lowFrequency.value || 400,
                  eq.current?.highFrequency.value || 2500
                )
              }
            />
          </label>
          <div className="explainer">Used for clarity and air in sound</div>
          </div>
          <div className="buttonSection">
          <label>
            High Frequency: <br />
            <input
              type="range"
              min="1000"
              max="20000"
              step="1"
              defaultValue="0"
              onChange={(e) =>
                adjustEQ(
                  eq.current?.low.value || 0,
                  eq.current?.mid.value || 0,
                  eq.current?.high.value || 0,
                  eq.current?.lowFrequency.value || 400,
                  parseFloat(e.target.value)
                )
              }
            />
          </label>
          <div className="explainer">Higher will sound more airy, lower for definition</div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Equalizer;
