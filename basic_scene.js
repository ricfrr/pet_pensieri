import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
// INIT CAMERA
camera.position.z = 45;
camera.position.x = 3;
camera.position.y = 20;

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, -40);
controls.update();

// RESIZE HAMDLER
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// INIT HEMISPHERE LIGHT
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// SCENE
scene.background = new THREE.Color(0xe8b74d );

// FLOOR
// const plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial({ color: 0x0a7d15 }));
// plane.rotation.x = - Math.PI / 2
// plane.receiveShadow = true
// scene.add(plane);

// POINT LIGHT
const light1 = new THREE.PointLight(0xff6666, 1, 100);
light1.castShadow = true;
light1.shadow.mapSize.width = 4096;
light1.shadow.mapSize.height = 4096;
scene.add(light1);

const light2 = new THREE.PointLight(0x33ff33, 1, 100);
light2.castShadow = true;
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;
scene.add(light2);

// TEXT

const loader = new THREE.FontLoader();



loader.load('./fonts/Teko_Medium_Regular.json', function (font) {
    const geometry = new THREE.TextGeometry('Pet Pensieri', {
        font: font,
        size: 5,
        height: 2,
        curveSegments: 10,
        bevelEnabled: false,
        bevelOffset: 0,
        bevelSegments: 1,
        bevelSize: 0.3,
        bevelThickness: 1
    });
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xa8325c }), // front
        new THREE.MeshPhongMaterial({ color: 0x540722 }) // side
    ];
    const textMesh2 = new THREE.Mesh(geometry, materials);
    textMesh2.castShadow = true
    textMesh2.position.y += 5
    textMesh2.position.x -= 6
    textMesh2.rotation.y = -0.25
    scene.add(textMesh2)
});

 //end load function

// ANIMATE
function animate() {
    const now = Date.now() / 1000;
    light1.position.y = 15;
    light1.position.x = Math.cos(now) * 20;
    light1.position.z = Math.sin(now) * 20;

    light2.position.y = 15;
    light2.position.x = Math.sin(now) * 20;
    light2.position.z = Math.cos(now) * 20;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();

