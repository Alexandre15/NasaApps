import * as THREE from "three";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

export function JupiterMesh() {
    const jupiterMat = new THREE.MeshBasicMaterial({
        map: loader.load("./textures/2k_jupiter.jpg"),
      });
      const jupiterMesh = new THREE.Mesh(geometry, jupiterMat);
      jupiterMesh.layers.set(1)
    
      return jupiterMesh
}

function Jupiter() {
  const jupiterGroup = new THREE.Group();

  const jupiterMesh = JupiterMesh()
 jupiterGroup.add(jupiterMesh);

  return jupiterGroup;
}

export default Jupiter