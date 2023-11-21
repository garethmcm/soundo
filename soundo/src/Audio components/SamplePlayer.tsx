import React, { useState, useRef, useEffect } from "react";
import { Sampler } from "tone";

interface SamplePlayerProps {
  src: string;
}

const SamplePlayer: React.FC<SamplePlayerProps> = ({ src }) => {
  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef<Sampler | null>(null);

  useEffect(() => {
    sampler.current = new Sampler(
      { A1: src }, // Use the passed sound source URL
      {
        onload: () => {
          setLoaded(true);
        },
      }
    ).toDestination();
  }, [src]);

  const handleClick = () => {
    if (sampler.current) {
      sampler.current.triggerAttack("A1");
    }
  };

  const handleStop = () => {
    if (sampler.current) {
      sampler.current.triggerRelease("A1");
    }
  };

  return (
    <div>
      <button disabled={!isLoaded} onClick={handleClick}>
        Start
      </button>
      <button disabled={!isLoaded} onClick={handleStop}>
        Stop
      </button>
    </div>
  );
};

export default SamplePlayer;
