import * as THREE from "three";
import { EffectComposer, RenderPass, UnrealBloomPass, OrbitControls } from "three/examples/jsm/Addons.js";
import Sun from "./objects/sun";
import getData from "./getData";
import createMenu from "./utils/createMenu";
import Stars from "./objects/stars";
import Earth, { EarthMesh, LightsMesh, CloudsMesh } from "./objects/earth";
import show from "./utils/showObject";
import { Commet } from "./types/Commet";
import Moon from "./objects/moon";
import Mercury from "./objects/mercury";
import Jupiter from "./objects/jupiter";
import getRandomCoordinate from "./utils/getRandomCoordinate";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Meteor from "./objects/meteor";
import Neptune from "./objects/neptune";
import Mars from "./objects/mars";
import Uranus from "./objects/uranus";
import Venus from "./objects/venus";
import Saturn from "./objects/saturn";

// Global declaration
let scene;
let camera;
let renderer;
const canvas = document.getElementsByTagName("canvas")[0];

// Scene setup
scene = new THREE.Scene();
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

// Camera setup
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 8;
camera.position.x = 0;
scene.add(camera);

// Default renderer setup
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.autoClear = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setClearColor(0x000000, 0.0);
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.CineonToneMapping
renderer.toneMappingExposure = 1.5

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = false;
controls.maxDistance = 500;
controls.enablePan = false
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.rotateSpeed = 0.4;

// Bloom renderer setup
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 0.1; // Intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

// add objects
let sun = Sun()
sun.position.set(-400, 0, 0); // Alterado conforme sua versão
sun.scale.set(109.92, 109.92, 109.92); // Alterado conforme sua versão
scene.add(sun);

// add earth
let earthMesh = EarthMesh()
let lightsMesh = LightsMesh()
let cloudsMesh = CloudsMesh()
const earth = Earth(earthMesh, lightsMesh, cloudsMesh)
scene.add(earth)

// add moon
let moon = Moon()
moon.position.set(7.5, 0, 0)
moon.scale.set(0.272, 0.272, 0.272)
let moonOrbitGroup = new THREE.Group();
scene.add(moonOrbitGroup);
moonOrbitGroup.add(moon);

let mercury = Mercury()
mercury.position.set(-200, 0, 0)
mercury.scale.set(0.382, 0.382, 0.382)
scene.add(mercury)

let jupiter = Jupiter()
jupiter.position.set(150, 0, 0)
jupiter.scale.set(10.382, 10.382, 10.382)
scene.add(jupiter)

let neptune = Neptune()
neptune.position.set(600, 0, 0)
neptune.scale.set(3.86, 3.86, 3.86)
scene.add(neptune)

let mars = Mars()
mars.position.set(75, 0, 0)
mars.scale.set(0.533, 0.533, 0.533)
scene.add(mars)

let uranus = Uranus()
uranus.position.set(400, 0, 0)
uranus.scale.set(3.98, 3.98, 3.98)
scene.add(uranus)

let venus = Venus()
venus.position.set(-100, 0, 0)
venus.scale.set(0.949, 0.949, 0.949)
scene.add(venus)

let saturn = Saturn()
saturn.position.set(250, 0, 0)
saturn.scale.set(9.14, 9.14, 9.14)
scene.add(saturn)
/*
const loader = new GLTFLoader().setPath('./models/meteorite/');
loader.load('scene.gltf', (gltf) => {
  const mesh = gltf.scene;
  mesh.layers.set(1);
  console.log(mesh);
  scene.add(mesh);
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});
*/

// Galaxy geometry
const starGeometry = new THREE.SphereGeometry(500, 64, 64);

// Galaxy material
const textureLoader = new THREE.TextureLoader();
const starMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load("/textures/galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,
});

const starMesh = new THREE.Mesh(starGeometry, starMaterial);
starMesh.layers.set(1);
scene.add(starMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
sunLight.layers.set(1);
scene.add(sunLight);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
}, false);

const animate = () => {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  starMesh.rotation.y += 0.001;

  moonOrbitGroup.rotation.y -= 0.0037

  camera.layers.set(1);
  bloomComposer.render();
};
let COMMETS
(async () => {
  COMMETS = await getData()
  if (COMMETS.length == 0) {
    console.log("nao foi encontrado nenhum cometa")
  } else {
    for (let i = 0; i < COMMETS.comets.length; i++) {
      const comet_coordinate = getRandomCoordinate(COMMETS.comets[i].moid_au)

      let meteor = Meteor()
      meteor.position.set(comet_coordinate.x, comet_coordinate.y, comet_coordinate.z)
      meteor.scale.set(3, 3, 3)
      scene.add(meteor)

      COMMETS.comets[i].meteor = meteor
      // TRABALHA AQUI HENRY AAAAAAAAAAAAAAAAAAAAAAAAA
      //FELIZ ANIVERSARIO
    }

    createMenu(COMMETS);
  }
  animate();
})();


