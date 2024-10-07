import * as THREE from "three";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

export function NeptuneMesh() {
    const uranusMat = new THREE.MeshBasicMaterial({
        map: loader.load("./textures/2k_neptune.jpg"),
      });
      const neptuneMesh = new THREE.Mesh(geometry, uranusMat);
      neptuneMesh.layers.set(1)
    
      return neptuneMesh
}

function Neptune() {
  const neptuneGroup = new THREE.Group();

  const neptuneMesh = NeptuneMesh()
 neptuneGroup.add(neptuneMesh);

  return neptuneGroup;
}

export default Neptune