import { GLTFLoader } from "./GLTFLoader.js";
import * as dat from './dat.gui.module.js';


const scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);

const canvas = document.querySelector('canvas.webgl')

var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight)

// document.body.appendChild(renderer.domElement);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// const gui = new dat.GUI()

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


var loader = new GLTFLoader();

var obj;
loader.load("./Model/home-model.glb", function(gltf) {
    obj = gltf.scene;
    obj.position.set(9, -6, -30.57)
    obj.scale.set(1, 1, 1)
    obj.traverse(n => {
        if (n.isMesh) {
            n.astShadow = true;
            n.receiveShadow = true;
            if (n.material.map) n.material.map.anisotropy = 16;
        }
    })
    scene.add(gltf.scene);


});


var light = new THREE.SpotLight(0xffffff, 1);
light.castShadow = true;
light.shadow.bias = -0.0001;
light.shadow.mapSize.width = 1024 * 4;
light.shadow.mapSize.height = 1024 * 4;
light.position.set(-0.21, -3.51, 5.31);
scene.add(light);




var light2 = new THREE.DirectionalLight(0xebebeb, 6, 4);
light2.position.set(0.02, 0.9, 0.24);
light2.castShadow = true;

scene.add(light2);

light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;




const light4 = new THREE.HemisphereLight(0xffeeb1, 0x2b2b2b, 3)
scene.add(light4);





camera.position.set(0, 0, 10);

function animate() {
    requestAnimationFrame(animate);
    obj.rotation.y += 0.005;






    renderer.render(scene, camera);
}

animate();