import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import './style.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

// const light = new THREE.DirectionalLight(0xffffff);
// light.position.set(1, 1, 1);
// scene.add(light);

// const helper = new THREE.DirectionalLightHelper(light);
// scene.add(helper);

const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('./earth.jpg');
texture1.colorSpace = THREE.SRGBColorSpace;

const texture2 = textureLoader.load('./cloud.jpg');
texture2.colorSpace = THREE.SRGBColorSpace;

const canvas = document.getElementById('world');

const SphereGeometry1 = new THREE.SphereGeometry(1, 100, 100);
const SphereMaterial1 = new THREE.MeshPhysicalMaterial({ map: texture1 });
const Sphere1 = new THREE.Mesh(SphereGeometry1, SphereMaterial1);
scene.add(Sphere1);

const SphereGeometry2 = new THREE.SphereGeometry(1.01, 100, 100);
const SphereMaterial2 = new THREE.MeshPhysicalMaterial({
  transparent: true,
  alphaMap: texture2,
});

const Sphere2 = new THREE.Mesh(SphereGeometry2, SphereMaterial2);
scene.add(Sphere2);

const hdri = new RGBELoader();
hdri.load(
  'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/river_alcove_1k.hdr',
  function (hdriTexture) {
    hdriTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdriTexture;
    // scene.background = hdriTexture;
  }
);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setAnimationLoop(animate)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const clock = new THREE.Clock();
function animate() {
  window.requestAnimationFrame(animate);
  // Sphere1.rotation.x = 0.5;
  Sphere1.rotation.y = clock.getElapsedTime() * 0.05;
  Sphere2.rotation.y = clock.getElapsedTime() * 0.09;
  controls.update();
  renderer.render(scene, camera);
}
animate();
