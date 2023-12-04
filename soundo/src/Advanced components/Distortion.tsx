import "../Audio components/AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, Distortion } from "tone";

import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
import guitar from "/assets/AUDIO SAMPLES/GUITAR WITH VERB.wav";
import bass from "/assets/AUDIO SAMPLES/BASS.wav";
import drums from "/assets/AUDIO SAMPLES/DRUMS WITH VERB.wav";
import piano from "/assets/AUDIO SAMPLES/PIANO.wav";
import vocals from "/assets/AUDIO SAMPLES/VOCAL WITH VERB.wav";

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";

interface CompItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

const distortPlaylist: CompItems[] = [
  { noteAllocation: "C4", fileLocation: sunshine, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: guitar, sampleTitle: "Guitar" },
  { noteAllocation: "E4", fileLocation: bass, sampleTitle: "Bass" },
  { noteAllocation: "F4", fileLocation: drums, sampleTitle: "Drums" },
  { noteAllocation: "G4", fileLocation: piano, sampleTitle: "Piano" },
  { noteAllocation: "A5", fileLocation: vocals, sampleTitle: "Vocals" },
];

const DistortionComponent: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const distort = useRef<Distortion | null>(null);
  const [distortion, setDistortion] = useState(0.5);

  useEffect(() => {
    sampler.current = new Sampler(
      Object.fromEntries(
        distortPlaylist.map((item) => [item.noteAllocation, item.fileLocation])
      ),
      {
        onload: () => {
          setLoaded(true);
        },
      }
    );

    distort.current = new Distortion({
      distortion: 0.5,
    }).toDestination();

    if (sampler.current && distort.current) {
      sampler.current.connect(distort.current);
    }

    return () => {
      if (sampler.current) {
        sampler.current.dispose();
      }
      if (distort.current) {
        distort.current.dispose();
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

  const adjustDistortion = (
    distortion: number,
  ) => {
    if (distort.current) {
      distort.current.distortion = distortion;
    }
  };

  return (
    <div>
      <h1>Distortion</h1>
      <div className="audioComponentDisplay">
        <div className="playerButtonBox">
          <div>
            {distortPlaylist.map((item) => (
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
            Distortion:
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="0.5"
              onChange={(e) =>
                adjustDistortion(
                  parseFloat(e.target.value),
                )
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default DistortionComponent;
