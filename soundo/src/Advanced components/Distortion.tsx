import "../Audio components/AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, Distortion } from "tone";

import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
import guitar from "/assets/AUDIO SAMPLES/GUITAR.mp3";
import bass from "/assets/AUDIO SAMPLES/BASS.mp3";
import drums from "/assets/AUDIO SAMPLES/DRUMS.mp3";
import piano from "/assets/AUDIO SAMPLES/PIANO.mp3";
import vocals from "/assets/AUDIO SAMPLES/VOCAL WITH VERB.mp3";

import playButton from "/assets/play-circle.svg";
import stopButton from "/assets/stop-circle.svg";

interface DistItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

const distortPlaylist: DistItems[] = [
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
    ).toDestination();

    sampler.current.volume.value = 0.5;
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
    level: number,
  ) => {
    if (distort.current && sampler.current) {
      distort.current.distortion = level;
      sampler.current.volume.value = 1 - level;
    }
  };

  return (
    <div>
      <h1>Distortion</h1>
      <p className="blurb">This is when the source is overloaded which adds additional harmonics to the sound.</p>
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
        <div className="buttonSection">
          <label>
            Mix: <br />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              onChange={(e) =>
                adjustDistortion(
                  parseFloat(e.target.value),
                )
              }
            />
          </label>
          <div className="explainer">Determines amount of distortion sent to sound</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistortionComponent;
