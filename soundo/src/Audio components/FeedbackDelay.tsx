import "./AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, FeedbackDelay } from "tone";

import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
import guitar from "/assets/AUDIO SAMPLES/GUITAR.mp3";
import bass from "/assets/AUDIO SAMPLES/BASS.mp3";
import drums from "/assets/AUDIO SAMPLES/DRUMS.mp3";
import piano from "/assets/AUDIO SAMPLES/PIANO.mp3";
import vocals from "/assets/AUDIO SAMPLES/VOCAL NO VERB.mp3"; 


import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";

interface delayItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

// audio samples allocated to midi notes on sampler

const delayPlaylist: delayItems[] = [
  { noteAllocation: "C4", fileLocation: sunshine, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: guitar, sampleTitle: "Guitar" },
  { noteAllocation: "E4", fileLocation: bass, sampleTitle: "Bass" },
  { noteAllocation: "F4", fileLocation: drums, sampleTitle: "Drums" },
  { noteAllocation: "G4", fileLocation: piano, sampleTitle: "Piano" },
  { noteAllocation: "A5", fileLocation: vocals, sampleTitle: "Vocals" },
];

// initialise states

const Delay: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const delay = useRef<FeedbackDelay | null>(null);
  const [delayTime, setDelayTime] = useState(0.1);

  // React hook initialises compressor & sampler, connects them and plays output from comp (toDestination)

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
      delayTime: 1,
      feedback: 0.5,
      wet: 0.5
    }).toDestination();

    if (sampler.current && delay.current) {
      sampler.current.connect(delay.current);
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

  const adjustDelay = (
    delayTime: number,
    feedback: number,
    wet: number
  ) => {
    if (delay.current) {
      delay.current.delayTime.value = delayTime;
      delay.current.feedback.value = feedback;
      delay.current.wet.value = wet;
    }
  };

  return (
    <div>
      <h1>Delay</h1>
      <p className="blurb">This gives a repeat of the audio signal that plays after the original to give a spacial effect.</p>
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
          <div className="buttonSection">
            <label>
            Time: <br />
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              defaultValue="50"
              onChange={(e) =>
                adjustDelay(
                  parseFloat(e.target.value),
                  delay.current?.feedback.value || 4,
                  delay.current?.wet.value || 4,
                )
              }
            /> 
            </label>
              <div className="explainer">This sets how high the level of audio has to be before the compressor kicks in</div>
          </div>
          <div className="buttonSection">
            <label>
            Repeats: <br />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              onChange={(e) =>
                adjustDelay(
                delayTime,
                parseFloat(e.target.value),
                delay.current?.wet.value || 4,
                )
              }
            /> 
            </label>
              <div className="explainer">This sets how high the level of audio has to be before the compressor kicks in</div>
          </div>
          <div className="buttonSection">
            <label>
            Wet / Dry: <br />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              onChange={(e) =>
                adjustDelay(
                delayTime,
                delay.current?.feedback.value || 4,
                parseFloat(e.target.value),
                )
              }
            /> 
            </label>
              <div className="explainer">Sets ratio of unaffected signal to affected signal</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delay;
