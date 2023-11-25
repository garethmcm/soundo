import "../Audio components/AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, Compressor } from "tone";

import audioPath1 from "/assets/YOU ARE MY SUNSHINE.mp3";
import audioPath2 from "/assets/HAVE YOU EVER SEEN THE RAIN.mp3";
import audioPath3 from "/assets/DEEP ELEM BLUES.mp3";

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";

interface CompItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

const compPlaylist: CompItems[] = [
  { noteAllocation: "C4", fileLocation: audioPath1, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: audioPath2, sampleTitle: "The Rain" },
  { noteAllocation: "E4", fileLocation: audioPath3, sampleTitle: "Deep Elem" },
];

const Parallel: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const compressor = useRef<Compressor | null>(null);
  const [attack, setAttack] = useState(0.1);
  const [release, setRelease] = useState(0.5);

  useEffect(() => {
    sampler.current = new Sampler(
      Object.fromEntries(
        compPlaylist.map((item) => [item.noteAllocation, item.fileLocation])
      ),
      {
        onload: () => {
          setLoaded(true);
        },
      }
    );

    compressor.current = new Compressor({
      threshold: -20,
      ratio: 4,
      attack: 0.1,
      release: 0.5,
    }).toDestination();

    if (sampler.current && compressor.current) {
      sampler.current.connect(compressor.current);
    }

    return () => {
      if (sampler.current) {
        sampler.current.dispose();
      }
      if (compressor.current) {
        compressor.current.dispose();
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

  const adjustCompressor = (
    threshold: number,
    ratio: number,
    attack: number,
    release: number
  ) => {
    if (compressor.current) {
      compressor.current.threshold.value = threshold;
      compressor.current.ratio.value = ratio;
      compressor.current.attack.value = attack;
      compressor.current.release.value = release;
    }
  };

  return (
    <div>
      <h1>Compression</h1>
      <div className="audioComponentDisplay">
        <div className="playerButtonBox">
          <div>
            {compPlaylist.map((item) => (
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
            Threshold:
            <input
              type="range"
              min="-80"
              max="0"
              step="1"
              defaultValue="-20"
              onChange={(e) =>
                adjustCompressor(
                  parseFloat(e.target.value),
                  compressor.current?.ratio.value || 4,
                  attack,
                  release
                )
              }
            />
          </label>
          <label>
            Ratio:
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              defaultValue="4"
              onChange={(e) =>
                adjustCompressor(
                  compressor.current?.threshold.value || -20,
                  parseFloat(e.target.value),
                  attack,
                  release
                )
              }
            />
          </label>
          <label>
            Attack:
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.1"
              onChange={(e) => {
                setAttack(parseFloat(e.target.value));
                adjustCompressor(
                  compressor.current?.threshold.value || -20,
                  compressor.current?.ratio.value || 4,
                  parseFloat(e.target.value),
                  release
                );
              }}
            />
            {attack}
          </label>
          <label>
            Release:
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              onChange={(e) => {
                setRelease(parseFloat(e.target.value));
                adjustCompressor(
                  compressor.current?.threshold.value || -20,
                  compressor.current?.ratio.value || 4,
                  attack,
                  parseFloat(e.target.value)
                );
              }}
            />
            {release}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Parallel;
