import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const canvas = document.getElementById('world');



// const SphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// const SphereMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
// Sphere.position.x = -1;

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array(3000);

for (let i = 0; i < 1000 * 3; i++) {
  vertices[i] = (Math.random() - 0.5) * 10;
}

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const material = new THREE.MeshBasicMaterial( { color: 'red', wireframe: true } );
const mesh = new THREE.Mesh(geometry, material)



scene.add(mesh);


camera.position.z = 5;

const renderer = new THREE.WebGLRenderer( { canvas: canvas } );
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setAnimationLoop(animate)

const controls = new OrbitControls( camera, renderer.domElement );

const clock = new THREE.Clock();
function animate() {
  window.requestAnimationFrame(animate);
  // mesh.rotation.x = clock.getElapsedTime();
  // mesh.rotation.y = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
}
animate();