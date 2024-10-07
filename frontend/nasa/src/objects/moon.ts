import * as THREE from "three"

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

export function MoonMesh() {
  const moonMat = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/moonmap2k.jpg"),
  });
  const moonMesh = new THREE.Mesh(geometry, moonMat);
  moonMesh.layers.set(1)

  return moonMesh
}

export function MoonBump() {
  const moonMat = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/moonbump2k.jpg"),
    blending: THREE.AdditiveBlending,
    opacity: 0.5
  });
  const moonBump = new THREE.Mesh(geometry, moonMat);
  moonBump.layers.set(1)

  return moonBump
}

function Moon() {
  const moonGroup = new THREE.Group()

  const moonMesh = MoonMesh()
  moonGroup.add(moonMesh)

  const moonBump = MoonBump()
  moonGroup.add(moonBump)

  return moonGroup
}

export default Moon
