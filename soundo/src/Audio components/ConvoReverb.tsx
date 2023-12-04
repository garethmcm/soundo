import "./AudioComponents.css";
import React, { useState, useRef, useEffect } from "react";
import { Sampler, Convolver } from "tone";

import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
import guitar from "/assets/AUDIO SAMPLES/GUITAR.mp3";
import bass from "/assets/AUDIO SAMPLES/BASS.mp3";
import drums from "/assets/AUDIO SAMPLES/DRUMS.mp3";
import piano from "/assets/AUDIO SAMPLES/PIANO.mp3";
import vocals from "/assets/AUDIO SAMPLES/VOCAL WITH VERB.mp3";

import batteryBenson from "/assets/reverbs/BatteryBenson.wav";
import byronGlacier from "/assets/reverbs/ByronGlacier.wav";
import naumburgBandshell from "/assets/reverbs/NaumburgBandshell.wav";
import redBridge from "/assets/reverbs/RedBridge.wav";

import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";

interface ConvoItems {
  noteAllocation: string;
  fileLocation: string;
  sampleTitle: string;
}

interface ConvoReverbs {
  id: number;
  fileLocation: string;
  presetTitle: string;
}

const convoPlaylist: ConvoItems[] = [
  { noteAllocation: "C4", fileLocation: sunshine, sampleTitle: "Sunshine" },
  { noteAllocation: "D4", fileLocation: guitar, sampleTitle: "Guitar" },
  { noteAllocation: "E4", fileLocation: bass, sampleTitle: "Bass" },
  { noteAllocation: "F4", fileLocation: drums, sampleTitle: "Drums" },
  { noteAllocation: "G4", fileLocation: piano, sampleTitle: "Piano" },
  { noteAllocation: "A5", fileLocation: vocals, sampleTitle: "Vocals" },
];

const reverbPresets: ConvoReverbs[] = [
  { id: 1, fileLocation: batteryBenson, presetTitle: "Battery Benson" },
  { id: 2, fileLocation: byronGlacier, presetTitle: "Byron Glacier" },
  { id: 3, fileLocation: naumburgBandshell, presetTitle: "Naumburg Bandshell" },
  { id: 3, fileLocation: redBridge, presetTitle: "Red Bridge" },
];

const ReverbComponent: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);
  const convolver = useRef<Convolver | null>(null);
  const [mix, setMix] = useState(0.5);

  useEffect(() => {
    sampler.current = new Sampler(
      Object.fromEntries(
        convoPlaylist.map((item) => [item.noteAllocation, item.fileLocation])
      ),
      {
        onload: () => {
          setLoaded(true);
        },
      }
    );

    convolver.current = new Convolver().toDestination();

    if (sampler.current && convolver.current) {
      sampler.current.connect(convolver.current);
    }

    return () => {
      if (sampler.current) {
        sampler.current.dispose();
      }
      if (convolver.current) {
        convolver.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (convolver.current) {
      convolver.current.mix = mix;
    }
  }, [mix]);

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

  const adjustReverb = (presetId: number) => {
    const selectedReverb = reverbPresets.find((preset) => preset.id === presetId);

    if (convolver.current && selectedReverb) {
      convolver.current.load(selectedReverb.fileLocation);
    }
  };

  return (
    <div>
      <h1>Convolution reverb</h1>
      <div className="audioComponentDisplay">
        <div className="playerButtonBox">
          <div>
            {convoPlaylist.map((item) => (
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
            Reverb Preset:
            <select
              onChange={(e) =>
                adjustReverb(parseInt(e.target.value, 10))
              }
            >
              <option value="0">None</option>
              {reverbPresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.presetTitle}
                </option>
              ))}
            </select>
          </label>
          <label>
            Mix:
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              onChange={(e) => setMix(parseFloat(e.target.value))}
            />
            {mix}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ReverbComponent;
