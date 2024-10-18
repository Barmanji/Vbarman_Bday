import React from "react";
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { useMemo } from "react";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";
import MusicPlayer from "./components/Music";
import { useState } from "react";

function App() {
  const { play, end } = usePlay();
      const [playMusic, setPlayMusic] = useState(false);


  const effects = useMemo(
    () => (
      <EffectComposer>
        <Noise opacity={0.08} />
      </EffectComposer>
    ),
    []
  );
 const handleExplore = () => {
    console.log("Explore clicked! Music should start.");
    setPlayMusic(true);  // Start music when the "Explore" button is clicked
  };        // Path to the music file in the public/music folder

     return (
    <>
                 <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls
          pages={play && !end ? 20 : 0}
          damping={0.5}
          style={{
            top: "10px",
            left: "0px",
            bottom: "10px",
            right: "10px",
            width: "auto",
            height: "auto",
            animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
            opacity: 0,
          }}
        >
          <Experience />
        </ScrollControls>
        {effects}
      </Canvas>

             <Overlay onExplore={handleExplore} />

            <MusicPlayer audioSrc="/music/song.mp3" playMusic={playMusic} />

    </>
  );
}

export default App;
