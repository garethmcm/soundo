import "./AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, Compressor } from "tone";

import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
import guitar from "/assets/AUDIO SAMPLES/GUITAR.mp3";
import bass from "/assets/AUDIO SAMPLES/BASS.mp3";
import drums from "/assets/AUDIO SAMPLES/DRUMS.mp3";
import piano from "/assets/AUDIO SAMPLES/PIANO.mp3";
import vocals from "/assets/AUDIO SAMPLES/VOCAL WITH VERB.mp3"; 


import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";
import { Time } from "tone/build/esm/core/type/Units";

interface CompItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

// audio samples allocated to midi notes on sampler

const compPlaylist: CompItems[] = [
  { noteAllocation: "C4", fileLocation: sunshine, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: guitar, sampleTitle: "Guitar" },
  { noteAllocation: "E4", fileLocation: bass, sampleTitle: "Bass" },
  { noteAllocation: "F4", fileLocation: drums, sampleTitle: "Drums" },
  { noteAllocation: "G4", fileLocation: piano, sampleTitle: "Piano" },
  { noteAllocation: "A5", fileLocation: vocals, sampleTitle: "Vocals" },
];

// initialise states

const Compression: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const compressor = useRef<Compressor | null>(null);
  const [attack, setAttack] = useState(0.1);
  const [release, setRelease] = useState(0.5);

  // React hook initialises compressor & sampler, connects them and plays output from comp (toDestination)

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

  // handles play and stop functions using sample trigger and release

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

  // used by html code below using slider to make adjustments

  const adjustCompressor = (
    threshold: number,
    ratio: number,
    attack: Time,
    release: Time
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
      <p className="blurb">This works by clamping down on a sound after it has passed a given level. </p>
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
          <div className="buttonSection">
            <label>
            Threshold: <br />
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
                  compressor.current?.attack.value || 0.1,
                  compressor.current?.release.value || 0.5
                )
              }
            /> 
            </label>
              <div className="explainer">This sets how high the level of audio has to be before the compressor kicks in</div>
          </div>
          <div className="buttonSection">
          <label>
            Ratio: <br />
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
                  compressor.current?.attack.value || 0.1,
                  compressor.current?.release.value || 0.5
                )
              }
            />
          </label>
              <div className="explainer">This is the intensity at which the audio over the threshold is compressed by</div>
          </div>
          <div className="buttonSection">
          <label>
            Attack: <br />
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
                  compressor.current?.release.value || 0.5
                );
              }}
            />
          </label>
          {attack} <div className="explainer">How quickly compressor acts after it hits threshold</div>
          </div>
          <div className="buttonSection">
          <label>
            Release: <br />
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
                  compressor.current?.attack.value || 0.1,
                  parseFloat(e.target.value)
                );
              }}
            />
          </label>
          {release}
              <div className="explainer">How long the compressor acts after it kicks in</div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compression;
