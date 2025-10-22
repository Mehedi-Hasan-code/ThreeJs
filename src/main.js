import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const canvas = document.getElementById('world');

const geometry = new THREE.BoxGeometry(1, 3, 1);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 1;


const SphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const SphereMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
Sphere.position.x = -1;


const group = new THREE.Group();
group.add(Sphere);
group.add(cube);
group.position.y = 1;

scene.add(group);


camera.position.z = 5;

const renderer = new THREE.WebGLRenderer( { canvas: canvas } );
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate)


function animate() {
  // window.requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// animate();