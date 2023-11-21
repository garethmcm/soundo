import "./AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, Reverb } from "tone";

import audioPath1 from "/Users/gareth/Documents/Uni/Individual project/Soundo project/soundo/assets/YOU ARE MY SUNSHINE.mp3";
import audioPath2 from "/Users/gareth/Documents/Uni/Individual project/Soundo project/soundo/assets/HAVE YOU EVER SEEN THE RAIN.mp3";
import audioPath3 from "/Users/gareth/Documents/Uni/Individual project/Soundo project/soundo/assets/DEEP ELEM BLUES.mp3";

import playButton from "/Users/gareth/Documents/Uni/Individual project/Soundo project/soundo/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/Users/gareth/Documents/Uni/Individual project/Soundo project/soundo/node_modules/bootstrap-icons/icons/stop-circle.svg";

interface ReverbItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

const reverbPlaylist: ReverbItems[] = [
  { noteAllocation: "C4", fileLocation: audioPath1, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: audioPath2, sampleTitle: "The Rain" },
  { noteAllocation: "E4", fileLocation: audioPath3, sampleTitle: "Deep Elem" },
];

const Reverb: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const reverb = useRef<Reverb | null>(null);

  useEffect(() => {
    sampler.current = new Sampler(
      Object.fromEntries(
        reverbPlaylist.map((item) => [item.noteAllocation, item.fileLocation])
      ),
      {
        onload: () => {
          setLoaded(true);
        },
      }
    );

    reverb.current = new Reverb({
      decay: 3, // in seconds
      wet: 0.7, // range from 0 to 1
    });

    if (sampler.current && reverb.current) {
      sampler.current.connect(reverb.current);
      reverb.current.toDestination();
    }

    return () => {
      if (sampler.current) {
        sampler.current.dispose();
      }
      if (reverb.current) {
        reverb.current.dispose();
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

  const adjustReverb = (decay: number, wet: number) => {
    if (reverb.current) {
      reverb.current.decay = decay;
      reverb.current.wet.value = wet;
    }
  };

  return (
    <div>
      <h1>Reverb</h1>
      <div className="audioComponentDisplay">
        <div className="playerButtonBox">
          <div>
            {reverbPlaylist.map((item) => (
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
            Decay (s):
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              defaultValue="3"
              onChange={(e) =>
                adjustReverb(
                  parseFloat(e.target.value),
                  reverb.current?.wet.value || 0
                )
              }
            />
          </label>
          <label>
            Wet:
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.7"
              onChange={(e) =>
                adjustReverb(
                  reverb.current?.decay || 3,
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

export default Reverb;
