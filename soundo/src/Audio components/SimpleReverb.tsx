import "./AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, JCReverb } from "tone";

import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
import guitar from "/assets/AUDIO SAMPLES/GUITAR.mp3";
import bass from "/assets/AUDIO SAMPLES/BASS.mp3";
import drums from "/assets/AUDIO SAMPLES/DRUMS.mp3";
import piano from "/assets/AUDIO SAMPLES/PIANO.mp3";
import vocals from "/assets/AUDIO SAMPLES/VOCAL WITH VERB.mp3";

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";
import { NormalRange } from "tone/build/esm/core/type/Units";

interface ReverbItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

const reverbPlaylist: ReverbItems[] = [
  { noteAllocation: "C4", fileLocation: sunshine, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: guitar, sampleTitle: "Guitar" },
  { noteAllocation: "E4", fileLocation: bass, sampleTitle: "Bass" },
  { noteAllocation: "F4", fileLocation: drums, sampleTitle: "Drums" },
  { noteAllocation: "G4", fileLocation: piano, sampleTitle: "Piano" },
  { noteAllocation: "A5", fileLocation: vocals, sampleTitle: "Vocals" },
];

const ReverbEffect: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const reverb = useRef<JCReverb | null>(null);

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

    reverb.current = new JCReverb({
      roomSize: 0.35,
      wet: 0.35
    }).toDestination();

    if (sampler.current && reverb.current) {
      sampler.current.connect(reverb.current);
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

  const adjustReverb = (
    roomSize: NormalRange,
    wet: number
  ) => {
    if (reverb.current) {
      reverb.current.roomSize.value = roomSize;
      reverb.current.wet.value = wet;
    }
  };

  return (
    <div>
      <h1>Simple Reverb</h1>
      <p className="blurb">This is another spacial effect made up of lots of delays chained together that give the impression of the sound in a room.</p>
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
        <div className="buttonSection">
          <label>
            Amount (s): <br />
            <input
              type="range"
              min="0"
              max="0.7"
              step="0.01"
              defaultValue="0.35"
              onChange={(e) =>
                adjustReverb(
                  parseFloat(e.target.value),
                  reverb.current?.wet.value || 0.35,
                )
              }
            />
          </label>
          <div className="explainer">How big the space is supposed to sound</div>
          </div>
          <div className="buttonSection">
          <label>
            Mix: <br />
            <input
              type="range"
              min="0"
              max="0.7"
              step="0.01"
              defaultValue="0.35"
              onChange={(e) =>
                adjustReverb(
                  reverb.current?.roomSize.value || 0.5,
                  parseFloat(e.target.value)
                )
              }
            />
          </label>
          <div className="explainer">The ratio of affected to unaffected sound</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReverbEffect;
