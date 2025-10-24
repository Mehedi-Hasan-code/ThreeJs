- In Three js we need to create

1. a scene,
2. a camera and
3. a renderer

- Then we need to create

1. a geometry,
2. a material and
3. a mesh using the geometry and material

- Then we need to add

1. The mesh to the scene and
2. add scene and camera to the renderer

# For adding controls to the camera

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

* We need to add controls.update() in the animate function
controls.update();

* We need to add light for some materials
# For adding a light

import { DirectionalLightHelper } from 'three/examples/jsm/helpers/DirectionalLightHelper';

light = new DirectionalLight(0xffffff);
light.position.set( 1, 1, 1);
scene.add( light );

# Light helper
helper = new DirectionalLightHelper( light );
scene.add( helper );

# For adding a texture

import { TextureLoader } from 'three';

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./earth.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

sphereMaterial.map = texture;

# For Responsiveness
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

# For adding a hdri

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

hdri = new RGBELoader();
hdri.load(
  'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/river_alcove_1k.hdr',
  function (hdriTexture) {
    hdriTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdriTexture;
    // scene.background = hdriTexture;
  }
);

# For adding 3d models

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
loader.load(
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
  function (gltf) {
    scene.add(gltf.scene);
  }
);

