import "../Audio components/AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, Phaser } from "tone";

import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
import guitar from "/assets/AUDIO SAMPLES/GUITAR.mp3";
import bass from "/assets/AUDIO SAMPLES/BASS.mp3";
import drums from "/assets/AUDIO SAMPLES/DRUMS.mp3";
import piano from "/assets/AUDIO SAMPLES/PIANO.mp3";
import vocals from "/assets/AUDIO SAMPLES/VOCAL WITH VERB.mp3";

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";
import { Frequency } from "tone/build/esm/core/type/Units";

interface PhaserItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

const phaserPlaylist: PhaserItems[] = [
  { noteAllocation: "C4", fileLocation: sunshine, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: guitar, sampleTitle: "Guitar" },
  { noteAllocation: "E4", fileLocation: bass, sampleTitle: "Bass" },
  { noteAllocation: "F4", fileLocation: drums, sampleTitle: "Drums" },
  { noteAllocation: "G4", fileLocation: piano, sampleTitle: "Piano" },
  { noteAllocation: "A5", fileLocation: vocals, sampleTitle: "Vocals" },
];

const PhaserComponent: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const phaser = useRef<Phaser | null>(null);

  useEffect(() => {
    sampler.current = new Sampler(
      Object.fromEntries(
        phaserPlaylist.map((item) => [item.noteAllocation, item.fileLocation])
      ),
      {
        onload: () => {
          setLoaded(true);
        },
      }
    ).toDestination();

    sampler.current.volume.value = 0.5;
    phaser.current = new Phaser({
      frequency: 15,
      octaves: 5,
      baseFrequency: 1000
    }).toDestination();

    if (sampler.current && phaser.current) {
      sampler.current.connect(phaser.current);
    }

    return () => {
      if (sampler.current) {
        sampler.current.dispose();
      }
      if (phaser.current) {
        phaser.current.dispose();
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

  const adjustPhaser = (
    frequency: Frequency,
    octaves: number,
    baseFrequency: Frequency
  ) => {
    if(phaser.current) {
      phaser.current.frequency.value = frequency;
      phaser.current.octaves = octaves;
      phaser.current.baseFrequency = baseFrequency;
    }

  };

  return (
    <div>
      <h1>Phaser</h1>
      <p className="blurb">This gives a repeat of the audio signal that plays after the original to give a spacial effect.</p>
      <div className="audioComponentDisplay">
        <div className="playerButtonBox">
          <div>
            {phaserPlaylist.map((item) => (
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
            Frequency: <br />
            <input
              type="range"
              min="0"
              max="30"
              step="0.1"
              defaultValue="15"
              onChange={(e) =>
                adjustPhaser(
                  parseFloat(e.target.value),
                  phaser.current?.octaves || 0,
                  phaser.current?.baseFrequency || 1000
                )
              }
            />
          </label>
          <div className="explainer">Determines amount of distortion sent to sound</div>
          </div>
          <div className="buttonSection">
          <label>
            Octaves: <br />
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              defaultValue="5"
              onChange={(e) =>
                adjustPhaser(
                  phaser.current?.frequency.value || 15,
                  parseFloat(e.target.value),
                  phaser.current?.baseFrequency || 1000
                )
              }
            />
          </label>
          <div className="explainer">Determines amount of distortion sent to sound</div>
          </div>
          <div className="buttonSection">
          <label>
            Base frequency: <br />
            <input
              type="range"
              min="0"
              max="15000"
              step="0.1"
              defaultValue="1000"
              onChange={(e) =>
                adjustPhaser(
                  phaser.current?.frequency.value || 15,
                  phaser.current?.octaves || 0,
                  parseFloat(e.target.value)
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

export default PhaserComponent;
