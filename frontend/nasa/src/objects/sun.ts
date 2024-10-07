import * as THREE from "three";
//sun object

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

export function Sun() {
    const sunMat = new THREE.MeshBasicMaterial({
        map: loader.load("./textures/2k_sun.jpg"),
      });
      const sunMesh = new THREE.Mesh(geometry, sunMat);
      sunMesh.layers.set(1)
    
      return sunMesh
}

export default Sun

