import * as THREE from "three"

function Stars(): any {
  // galaxy geometry
  const starGeometry = new THREE.SphereGeometry(79, 64, 64);

  // galaxy material
  const textureLoader = new THREE.TextureLoader();
  const starMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load("../textures/galaxy1.png"),
    side: THREE.BackSide,
    transparent: true,
  });

  // galaxy mesh
  const stars = new THREE.Mesh(starGeometry, starMaterial);
  stars.layers.set(0);
  return stars
}

export default Stars
