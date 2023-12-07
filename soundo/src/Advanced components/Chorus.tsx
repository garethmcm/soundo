import "../Audio components/AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, Chorus } from "tone";

import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
import guitar from "/assets/AUDIO SAMPLES/GUITAR.mp3";
import bass from "/assets/AUDIO SAMPLES/BASS.mp3";
import drums from "/assets/AUDIO SAMPLES/DRUMS.mp3";
import piano from "/assets/AUDIO SAMPLES/PIANO.mp3";
import vocals from "/assets/AUDIO SAMPLES/VOCAL WITH VERB.mp3";

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";
import { Frequency, Seconds } from "tone/build/esm/core/type/Units";

interface ChorusItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

const chorusPlaylist: ChorusItems[] = [
  { noteAllocation: "C4", fileLocation: sunshine, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: guitar, sampleTitle: "Guitar" },
  { noteAllocation: "E4", fileLocation: bass, sampleTitle: "Bass" },
  { noteAllocation: "F4", fileLocation: drums, sampleTitle: "Drums" },
  { noteAllocation: "G4", fileLocation: piano, sampleTitle: "Piano" },
  { noteAllocation: "A5", fileLocation: vocals, sampleTitle: "Vocals" },
];

const ChorusEffect: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const chorus = useRef<Chorus | null>(null);

  useEffect(() => {
    sampler.current = new Sampler(
      Object.fromEntries(
        chorusPlaylist.map((item) => [item.noteAllocation, item.fileLocation])
      ),
      {
        onload: () => {
          setLoaded(true);
        },
      }
    ).toDestination();

    chorus.current = new Chorus({
      frequency: 4,
      delayTime: 2.5,
      depth: 0.5
    }).toDestination();

    if (sampler.current && chorus.current) {
      sampler.current.connect(chorus.current);
    }

    return () => {
      if (sampler.current) {
        sampler.current.dispose();
      }
      if (chorus.current) {
        chorus.current.dispose();
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

  const adjustChorus = (
    frequency: Frequency,
    delayTime: Seconds,
    depth: number

  ) => {
    if (chorus.current) {
        chorus.current.frequency.value = frequency;
        chorus.current.delayTime = delayTime;
        chorus.current.depth = depth;
    }

  };

  return (
    <div>
      <h1>Chorus</h1>
      <div className="audioComponentDisplay">
        <div className="playerButtonBox">
          <div>
            {chorusPlaylist.map((item) => (
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
            LFO:
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              defaultValue="4"
              onChange={(e) =>
                adjustChorus(
                  parseFloat(e.target.value),
                  chorus.current?.delayTime || 2.5,
                  chorus.current?.depth || 2.5,
                )
              }
            />
          </label>
        </div>
        <div className="paramDials">
          <label>
            Delay time:
            <input
              type="range"
              min="0"
              max="10"
              step="0.001"
              defaultValue="2.5"
              onChange={(e) =>
                adjustChorus(
                  chorus.current?.frequency.value || 1000,
                  parseFloat(e.target.value),
                  chorus.current?.depth || 2.5,
                )
              }
            />
          </label>
        </div>
        <div className="paramDials">
          <label>
            Depth:
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              onChange={(e) =>
                adjustChorus(
                  chorus.current?.frequency.value || 1000,
                  chorus.current?.delayTime || 2.5,
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

export default ChorusEffect;
