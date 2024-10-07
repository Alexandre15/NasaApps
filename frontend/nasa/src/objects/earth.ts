import * as THREE from "three"

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

export function EarthMesh() {
  const material = new THREE.MeshPhongMaterial({
    map: loader.load("./textures/00_earthmap1k.jpg"),
    specularMap: loader.load("./textures/02_earthspec1k.jpg"),
    bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
    bumpScale: 0.04,
  });
  // material.map.colorSpace = THREE.SRGBColorSpace;
  const earthMesh = new THREE.Mesh(geometry, material);
  earthMesh.layers.set(1)
  return earthMesh
}

export function LightsMesh() {
  const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/03_earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
  });
  const lightsMesh = new THREE.Mesh(geometry, lightsMat);
  lightsMesh.layers.set(1)

  return lightsMesh
}

export function CloudsMesh() {
  const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/04_earthcloudmap.jpg"),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
    // alphaTest: 0.3,
  });
  const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
  cloudsMesh.scale.setScalar(1.003);
  cloudsMesh.layers.set(1)
  return cloudsMesh
}

function Earth(earthMesh: any, lightsMesh: any, cloudsMesh: any) {
  const earthGroup = new THREE.Group();
  earthGroup.rotation.z = -23.4 * Math.PI / 180;

  earthGroup.add(earthMesh);

  earthGroup.add(lightsMesh);

  earthGroup.add(cloudsMesh);

  return earthGroup;
}

export default Earth
