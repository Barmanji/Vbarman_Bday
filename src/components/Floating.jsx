import { useRef, useEffect, useState } from 'react';
import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";

export const FloatingImage = ({ position, scale = 1, rotation = [0, 0, 0], imageUrl, sceneOpacity }) => {
  const materialRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    console.log('Loading image:', imageUrl); // Log the image URL
    const loader = new THREE.TextureLoader();

    const texture = loader.load(
      imageUrl,
      (loadedTexture) => {
        console.log('Image loaded successfully:', imageUrl);
        setTexture(loadedTexture); // Set the loaded texture in state
      },
      undefined,
      (error) => {
        console.error('Error loading image:', imageUrl, error);
      }
    );

    return () => {
      if (texture) {
        texture.dispose(); // Cleanup texture
      }
    };
  }, [imageUrl]);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = sceneOpacity.current;
    }
  });

  return (
    <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
      <mesh position={position} rotation={rotation} scale={[scale, scale, scale]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={materialRef}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        >
          {texture ? (
            <primitive attach="map" object={texture} />
          ) : (
            <meshBasicMaterial color="hotpink" /> // Fallback color for debugging
          )}
        </meshBasicMaterial>
      </mesh>
    </Float>
  );
};
