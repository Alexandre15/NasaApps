import * as THREE from "three";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

export function UranusMesh() {
    const uranusMat = new THREE.MeshBasicMaterial({
        map: loader.load("./textures/2k_uranus.jpg"),
      });
      const uranusMesh = new THREE.Mesh(geometry, uranusMat);
      uranusMesh.layers.set(1)
    
      return uranusMesh
}

function Uranus() {
  const uranusGroup = new THREE.Group();

  const uranusMesh = UranusMesh()
 uranusGroup.add(uranusMesh);

  return uranusGroup;
}

export default Uranus