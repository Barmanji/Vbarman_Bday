import React, { useEffect, useState } from 'react';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

const SVGComponent = ({ url, position }) => {
  const { scene } = useThree();
  const [svgGroup, setSvgGroup] = useState(null);

  useEffect(() => {
    const loadSVG = async (url) => {
      const loader = new SVGLoader();
      const svgData = await loader.loadAsync(url);

      const svgGroup = new THREE.Group(); // Group to hold the SVG shapes
      const material = new THREE.MeshBasicMaterial({
        color: 0x000000, // Change color as needed
        side: THREE.DoubleSide,
        depthWrite: false, // Helps with transparency
      });

      // Iterate over the SVG paths
      svgData.paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path); // Convert each path to shapes

        shapes.forEach((shape) => {
          const geometry = new THREE.ShapeGeometry(shape); // Create geometry from the shape
          const mesh = new THREE.Mesh(geometry, material); // Create mesh with the material
          svgGroup.add(mesh); // Add the mesh to the group
        });
      });

      setSvgGroup(svgGroup); // Store the group for rendering
    };

    loadSVG(url); // Call the load function

  }, [url]);

  // Add the loaded SVG group to the scene when ready
  useEffect(() => {
    if (svgGroup) {
      svgGroup.position.set(position.x, position.y, position.z); // Set position
      scene.add(svgGroup); // Add to the scene
    }

    return () => {
      if (svgGroup) {
        scene.remove(svgGroup); // Cleanup on unmount
      }
    };
  }, [svgGroup, scene, position]);

  return null; // No need to return anything, we're directly manipulating the scene
};

export default SVGComponent;

