import * as THREE from "three";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

export function MercuryMesh() {
    const mercuryMat = new THREE.MeshBasicMaterial({
        map: loader.load("./textures/2k_mercury.jpg"),
      });
      const mercuryMesh = new THREE.Mesh(geometry, mercuryMat);
      mercuryMesh.layers.set(1)
    
      return mercuryMesh
}

function Mercury() {
  const mercuryGroup = new THREE.Group();

  const mercuryMesh = MercuryMesh()
 mercuryGroup.add(mercuryMesh);

  return mercuryGroup;
}

export default Mercury