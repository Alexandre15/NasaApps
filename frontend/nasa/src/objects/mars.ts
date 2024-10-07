import * as THREE from "three";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

export function MarsMesh() {
    const marsMat = new THREE.MeshBasicMaterial({
        map: loader.load("./textures/2k_mars.jpg"),
      });
      const marsMesh = new THREE.Mesh(geometry, marsMat);
      marsMesh.layers.set(1)
    
      return marsMesh
}

function Mars() {
  const marsGroup = new THREE.Group();

  const marsMesh = MarsMesh()
 marsGroup.add(marsMesh);

  return marsGroup;
}

export default Mars