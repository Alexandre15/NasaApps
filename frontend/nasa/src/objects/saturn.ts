import * as THREE from "three";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

export function SaturnMesh() {
    const saturnMat = new THREE.MeshBasicMaterial({
        map: loader.load("./textures/2k_saturn.jpg"),
      });
      const saturnMesh = new THREE.Mesh(geometry, saturnMat);
      saturnMesh.layers.set(1)
    
      return saturnMesh
}

function Saturn() {
  const saturnGroup = new THREE.Group();

  const saturnMesh = SaturnMesh()
 saturnGroup.add(saturnMesh);

  return saturnGroup;
}

export default Saturn