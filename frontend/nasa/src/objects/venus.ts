import * as THREE from "three";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

export function VenusMesh() {
    const venusMat = new THREE.MeshBasicMaterial({
        map: loader.load("./textures/2k_venus_surface.jpg"),
      });
      const venusMesh = new THREE.Mesh(geometry, venusMat);
      venusMesh.layers.set(1)
    
      return venusMesh
}
export function VenusBump() {
    const venusMat = new THREE.MeshBasicMaterial({
      map: loader.load("./textures/2k_venus_atmosphere.jpg"),
      blending: THREE.AdditiveBlending,
      opacity: 0.5
    });
    const venusBump = new THREE.Mesh(geometry, venusMat);
    venusBump.layers.set(1)
  
    return venusBump
  }

function Venus() {
  const venusGroup = new THREE.Group();

  const venusMesh = VenusMesh()
 venusGroup.add(venusMesh);

  return venusGroup;
}

export default Venus