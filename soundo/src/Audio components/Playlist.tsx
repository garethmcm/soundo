import React, { useState, useRef, useEffect } from "react";
import { Player, ToneAudioNode } from "tone";

import "../App.css";

import playButton from "/Users/gareth/Documents/Uni/Individual project/Soundo project/soundo/node_modules/bootstrap-icons/icons/play-circle.svg";
import stopButton from "/Users/gareth/Documents/Uni/Individual project/Soundo project/soundo/node_modules/bootstrap-icons/icons/stop-circle.svg";

interface PlaylistProps {
  sources: string[];
  compressor: ToneAudioNode | null;
}

const Playlist: React.FC<PlaylistProps> = ({ sources, compressor }) => {
  const [selectedSource, setSelectedSource] = useState<string>(sources[0]);
  const [isLoaded, setLoaded] = useState(false);
  const player = useRef<Player | null>(null);

  useEffect(() => {
    const loadAudio = async () => {
      player.current = new Player(selectedSource, () => {
        setLoaded(true);
        if (compressor) {
          player.current?.connect(compressor);
        }
      }).toDestination();
    };

    loadAudio();

    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [selectedSource, compressor]);

  const handleClick = () => {
    if (player.current) {
      if (compressor) {
        player.current.connect(compressor);
      }
      player.current.start();
    }
  };

  const handleStop = () => {
    if (player.current) {
      player.current.stop();
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSource(event.target.value);
  };

  return (
    <div className="buttonBox">
      <span className="buttonStyle" onClick={handleClick}>
        <img src={playButton} alt="Play" />
      </span>
      <span className="buttonStyle" onClick={handleStop}>
        <img src={stopButton} alt="Stop" />
      </span>
      <select value={selectedSource} onChange={handleSelectChange}>
        {sources.map((source, index) => (
          <option key={index} value={source}>
            {source}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Playlist;
