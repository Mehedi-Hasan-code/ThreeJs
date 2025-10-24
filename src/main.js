import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './style.css';
import { inflate } from 'three/examples/jsm/libs/fflate.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// const light = new THREE.DirectionalLight(0xffffff);
// light.position.set(1, 1, 1);
// scene.add(light);

// const helper = new THREE.DirectionalLightHelper(light);
// scene.add(helper);

// const textureLoader = new THREE.TextureLoader();
// const texture1 = textureLoader.load('./earth.jpg');
// texture1.colorSpace = THREE.SRGBColorSpace;

// const texture2 = textureLoader.load('./cloud.jpg');
// texture2.colorSpace = THREE.SRGBColorSpace;

// const SphereGeometry1 = new THREE.SphereGeometry(1, 100, 100);
// const SphereMaterial1 = new THREE.MeshPhysicalMaterial({ map: texture1 });
// const Sphere1 = new THREE.Mesh(SphereGeometry1, SphereMaterial1);
// scene.add(Sphere1);

// const SphereGeometry2 = new THREE.SphereGeometry(1.01, 100, 100);
// const SphereMaterial2 = new THREE.MeshPhysicalMaterial({
//   transparent: true,
//   alphaMap: texture2,
// });

// const Sphere2 = new THREE.Mesh(SphereGeometry2, SphereMaterial2);
// scene.add(Sphere2);

// const hdri = new RGBELoader();
// hdri.load(
//   'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/river_alcove_1k.hdr',
//   function (hdriTexture) {
//     hdriTexture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.environment = hdriTexture;
//     // scene.background = hdriTexture;
//   }
// );

// const loader = new GLTFLoader();
// loader.load(
//   'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
//   function (gltf) {
//     scene.add(gltf.scene);
//   }
// );

const geo = new THREE.BoxGeometry(1, 2, 1);
const mat = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const canvas = document.getElementById('world');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setAnimationLoop(animate);

const mouse = {
  x: 0,
  y: 0,
};
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX / window.innerWidth - 0.5;
  mouse.y = -(e.clientY / window.innerHeight) + 0.5;
});

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.maxAzimuthAngle = -Math.PI / 4;
// controls.minAzimuthAngle = Math.PI / 4;
// controls.maxPolarAngle = Math.PI / 2;
// controls.minPolarAngle = Math.PI / 2;
// controls.minZoom = 0.1;
// controls.maxZoom = 10;
// controls.minDistance = 1;
// controls.maxDistance = 10;

const clock = new THREE.Clock();
function animate() {
  window.requestAnimationFrame(animate);
  // Sphere1.rotation.x = 0.5;
  // Sphere1.rotation.y = clock.getElapsedTime() * 0.05;
  // Sphere2.rotation.y = clock.getElapsedTime() * 0.09;
  // mesh.lookAt(new THREE.Vector3(mouse.x, mouse.y, 1));
  controls.update();
  renderer.render(scene, camera);
}
animate();

// lil-gui
const gui = new GUI();
gui.add(camera.position, 'x').min(-10).max(10).step(0.0001).name('PositionX');
gui.add(camera.position, 'y').min(-10).max(10).step(0.0001).name('PositionY');
gui.add(camera.position, 'z').min(-10).max(10).step(0.0001).name('PositionZ');
gui.add(mesh.position, 'x').min(-10).max(10).step(0.0001).name('PositionX');
gui.add(mesh.position, 'y').min(-10).max(10).step(0.0001).name('PositionY');
gui.add(mesh.position, 'z').min(-10).max(10).step(0.0001).name('PositionZ');
gui.add(mesh, 'visible');
gui.add(mat, 'wireframe')

console.log(mesh);