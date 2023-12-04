import "./AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, FeedbackDelay } from "tone";

import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
import guitar from "/assets/AUDIO SAMPLES/GUITAR NO VERB.wav";
import bass from "/assets/AUDIO SAMPLES/BASS.wav";
import drums from "/assets/AUDIO SAMPLES/DRUMS NO VERB.wav";
import piano from "/assets/AUDIO SAMPLES/PIANO.wav";
import vocals from "/assets/AUDIO SAMPLES/VOCAL NO VERB.wav";

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";

interface DelayItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

const delayPlaylist: DelayItems[] = [
  { noteAllocation: "C4", fileLocation: sunshine, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: guitar, sampleTitle: "Guitar" },
  { noteAllocation: "E4", fileLocation: bass, sampleTitle: "Bass" },
  { noteAllocation: "F4", fileLocation: drums, sampleTitle: "Drums" },
  { noteAllocation: "G4", fileLocation: piano, sampleTitle: "Piano" },
  { noteAllocation: "A5", fileLocation: vocals, sampleTitle: "Vocals" },
];

const Delay: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const delay = useRef<FeedbackDelay | null>(null);

  useEffect(() => {
    sampler.current = new Sampler(
      Object.fromEntries(
        delayPlaylist.map((item) => [item.noteAllocation, item.fileLocation])
      ),
      {
        onload: () => {
          setLoaded(true);
        },
      }
    );

    delay.current = new FeedbackDelay({
      delayTime: 0.5, // in seconds
      feedback: 0.5, // range from 0 to 1
    });

    if (sampler.current && delay.current) {
      sampler.current.connect(delay.current);
      delay.current.toDestination();
    }

    return () => {
      if (sampler.current) {
        sampler.current.dispose();
      }
      if (delay.current) {
        delay.current.dispose();
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

  const adjustDelay = (delayTime: number, feedback: number) => {
    if (delay.current) {
      delayTime = delayTime;
      feedback = feedback;
    }
  };

  return (
    <div>
      <h1>Delay</h1>
      <div className="audioComponentDisplay">
        <div className="playerButtonBox">
          <div>
            {delayPlaylist.map((item) => (
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
            Delay Time (s):
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              onChange={(e) =>
                adjustDelay(
                  parseFloat(e.target.value),
                  feedback
                )
              }
            />
          </label>
          <label>
            Feedback:
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              onChange={(e) =>
                adjustDelay(
                  delayTime,
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

export default Delay;
