import "./AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, EQ3 } from "tone";

import audioPath1 from "/assets/YOU ARE MY SUNSHINE.mp3";
import audioPath2 from "/assets/HAVE YOU EVER SEEN THE RAIN.mp3";
import audioPath3 from "/assets/DEEP ELEM BLUES.mp3";

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";

interface EqItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

const eqPlaylist: EqItems[] = [
  { noteAllocation: "C4", fileLocation: audioPath1, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: audioPath2, sampleTitle: "The Rain" },
  { noteAllocation: "E4", fileLocation: audioPath3, sampleTitle: "Deep Elem" },
];

const Equalizer: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const eq = useRef<EQ3 | null>(null);
  const [low, setLow] = useState(0);
  const [mid, setMid] = useState(0);
  const [high, setHigh] = useState(0);

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

  const adjustEQ = (low: number, mid: number, high: number) => {
    if (eq.current) {
      eq.current.low.value = low;
      eq.current.mid.value = mid;
      eq.current.high.value = high;
    }
  };

  return (
    <div>
      <h1>Equalizer</h1>
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
          <label>
            Low:
            <input
              type="range"
              min="-30"
              max="30"
              step="1"
              defaultValue="0"
              onChange={(e) =>
                adjustEQ(
                  parseFloat(e.target.value),
                  eq.current?.mid.value || 0,
                  eq.current?.high.value || 0
                )
              }
            />
          </label>
          <label>
            Mid:
            <input
              type="range"
              min="-30"
              max="30"
              step="1"
              defaultValue="0"
              onChange={(e) =>
                adjustEQ(
                  eq.current?.low.value || 0,
                  parseFloat(e.target.value),
                  eq.current?.high.value || 0
                )
              }
            />
          </label>
          <label>
            High:
            <input
              type="range"
              min="-30"
              max="30"
              step="1"
              defaultValue="0"
              onChange={(e) =>
                adjustEQ(
                  eq.current?.low.value || 0,
                  eq.current?.mid.value || 0,
                  parseFloat(e.target.value)
                )
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Equalizer;
