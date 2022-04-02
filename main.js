import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/src/geometries/TextGeometry';



var font_scaler =0

if (window.innerWidth/window.innerHeight >1){
  font_scaler = 30
  var offset_x = 0 //window.innerWidth*0.15
  var offset_y = 0// window.innerHeight*0.05
  var offset_z = 0

} else{
  font_scaler = 70
  var offset_x = window.innerWidth*0.10 //
  var offset_y = 0// window.innerHeight*0.05
  var offset_z = 0

} 
  

function updatePositionForCamera(camera,my_object) {
  // fixed distance from camera to the object
  var dist = 150;
  var cwd = new THREE.Vector3();
  
  camera.getWorldDirection(cwd);
  
  cwd.multiplyScalar(dist);
  cwd.add(camera.position);
  
  my_object.position.set(cwd.x-offset_x, cwd.y-offset_y, cwd.z-offset_z);
  my_object.setRotationFromQuaternion(camera.quaternion);
}
// Setup

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe8b74d);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);
// camera.position.setX(-3);

renderer.render(scene, camera);


// Torus

const geometry = new THREE.TorusGeometry(500, 30, 30, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Text
const loader = new THREE.FontLoader();

console.log(window.innerWidth/window.innerHeight)


  loader.load('./fonts/Teko_Medium_Regular.json', function (font) {
  const geometry = new THREE.TextGeometry('Pet\nPensieri', {
      font: font,
      size: (window.innerWidth/window.innerHeight)*font_scaler,
      height: 2,
      curveSegments: 50,
      bevelEnabled: false,
      bevelOffset: 0,
      bevelSegments: 1,
      bevelSize: 0.3,
      bevelThickness: 40
  });
  const materials = [
      new THREE.MeshPhongMaterial({ color: 0xa8325c }), // front
      new THREE.MeshPhongMaterial({ color: 0x540722 }) // side
  ];
  const textMesh2 = new THREE.Mesh(geometry, materials);
  textMesh2.castShadow = false
  updatePositionForCamera(camera, textMesh2)
  // textMesh2.position.y -= 20
  // textMesh2.position.x -= 50
  // textMesh2.rotation.z += 30

  scene.add(textMesh2)
});


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
