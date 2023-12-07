// import "../Audio components/AudioComponents.css";
// import React, { useState, useRef, useEffect } from "react";
// import { Sampler, AutoFilter } from "tone";

// import sunshine from "/assets/AUDIO SAMPLES/YOU ARE MY SUNSHINE.mp3";
// import guitar from "/assets/AUDIO SAMPLES/GUITAR.mp3";
// import bass from "/assets/AUDIO SAMPLES/BASS.mp3";
// import drums from "/assets/AUDIO SAMPLES/DRUMS.mp3";
// import piano from "/assets/AUDIO SAMPLES/PIANO.mp3";
// import vocals from "/assets/AUDIO SAMPLES/VOCAL WITH VERB.mp3";

// import playButton from "/node_modules/bootstrap-icons/icons/play-circle.svg";
// import stopButton from "/node_modules/bootstrap-icons/icons/stop-circle.svg";
// import { Seconds, Time } from "tone/build/esm/core/type/Units";

// interface EnvItems {
//   noteAllocation: string;
//   fileLocation: string;
//   sampleTitle: string;
// }

// const envPlaylist: EnvItems[] = [
//   { noteAllocation: "C4", fileLocation: sunshine, sampleTitle: "Sunshine" },
//   { noteAllocation: "D4", fileLocation: guitar, sampleTitle: "Guitar" },
//   { noteAllocation: "E4", fileLocation: bass, sampleTitle: "Bass" },
//   { noteAllocation: "F4", fileLocation: drums, sampleTitle: "Drums" },
//   { noteAllocation: "G4", fileLocation: piano, sampleTitle: "Piano" },
//   { noteAllocation: "A5", fileLocation: vocals, sampleTitle: "Vocals" },
// ];

// const EnvelopeEffect: React.FC = () => {
//   const [isLoaded, setLoaded] = useState(false);
//   const sampler = useRef<Sampler | null>(null);
//   const envelope = useRef<AutoFilter | null>(null);

//   useEffect(() => {
//     sampler.current = new Sampler(
//       Object.fromEntries(
//         envPlaylist.map((item) => [item.noteAllocation, item.fileLocation])
//       ),
//       {
//         onload: () => {
//           setLoaded(true);
//         },
//       }
//     );

//     envelope.current = new AutoFilter({
//       attack: 0.1,  
//       decay: 0.2,
//       sustain: 0.5,
//     }).toDestination();

//     if (sampler.current && envelope.current) {
//       sampler.current.connect(envelope.current);
//     }

//     return () => {
//       if (sampler.current) {
//         sampler.current.dispose();
//       }
//       if (envelope.current) {
//         envelope.current.dispose();
//       }
//     };
//   }, []);

//   const handlePlay = (note: string) => {
//     if (isLoaded && sampler.current) {
//       sampler.current.triggerAttack(note);
//     }
//   };

//   const handleStop = (note: string) => {
//     if (sampler.current) {
//       sampler.current.triggerRelease(note);
//     }
//   };

//   const adjustEnvelope = (
//     attack: Time,  
//     decay: Time,
//     sustain: number,
//     release: Time
//   ) => {
//     if (envelope.current) {
//         envelope.current.attack = attack;
//         envelope.current.decay = decay;
//         envelope.current.sustain = sustain;
//         envelope.current.release = release;
//     }
//   };

//   return (
//     <div>
//       <h1>Envelope</h1>
//       <div className="audioComponentDisplay">
//         <div className="playerButtonBox">
//           <div>
//             {envPlaylist.map((item) => (
//               <div className="playerButtonBox" key={item.noteAllocation}>
//                 <h2 className="sampleTitle">{item.sampleTitle}</h2>
//                 <div
//                   onClick={() => isLoaded && handlePlay(item.noteAllocation)}
//                 >
//                   <img src={playButton} alt="Play" className="buttons" />
//                 </div>
//                 <div
//                   onClick={() => isLoaded && handleStop(item.noteAllocation)}
//                 >
//                   <img src={stopButton} alt="Stop" className="buttons" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="paramDials">
//           <label>
//             Attack:
//             <input
//               type="range"
//               min="0"
//               max="5"
//               step="0.01"
//               defaultValue="0.1"
//               onChange={(e) =>
//                 adjustEnvelope(
//                   parseFloat(e.target.value),
//                   envelope.current?.release || 0.2,
//                   envelope.current?.sustain || 0.5,
//                   envelope.current?.release || 0.8,
//                 )
//               }
//             />
//           </label>
//         </div>
//         <div className="paramDials">
//           <label>
//             Decay:
//             <input
//               type="range"
//               min="0"
//               max="5"
//               step="0.001"
//               defaultValue="0.2"
//               onChange={(e) =>
//                 adjustEnvelope(
//                     envelope.current?.attack || 0.1,
//                     parseFloat(e.target.value),
//                     envelope.current?.sustain || 0.5,
//                     envelope.current?.release || 0.8,
//                 )
//               }
//             />
//           </label>
//         </div>
//         <div className="paramDials">
//           <label>
//             Sustain:
//             <input
//               type="range"
//               min="0"
//               max="0.9"
//               step="0.01"
//               defaultValue="0.5"
//               onChange={(e) =>
//                 adjustEnvelope(
//                     envelope.current?.attack || 0.1,
//                     envelope.current?.release || 0.2,
//                     parseFloat(e.target.value),
//                     envelope.current?.release || 0.8,
//                 )
//               }
//             />
//           </label>
//         </div>
//         <div className="paramDials">
//           <label>
//             Release:
//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.01"
//               defaultValue="0.5"
//               onChange={(e) =>
//                 adjustEnvelope(
//                     envelope.current?.attack || 0.1,
//                     envelope.current?.release || 0.2,
//                     envelope.current?.sustain || 0.5,
//                     parseFloat(e.target.value),
//                 )
//               }
//             />
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnvelopeEffect;
