import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { MaterialLoader } from 'three'
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

//import { BloomEffect, EffectComposer, EffectPass, RenderPass, BlendFunction,KernelSize } from "postprocessing";
import {
	sRGBEncoding,
	VSMShadowMap,
} from "three";


//Loading
const textureLoader = new THREE.TextureLoader();
//const normalTexture = textureLoader.load('/Maps/Sphere.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();
const color_bg = new THREE.Color("rgba(147,225,216)");
scene.background = color_bg ;
/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = sRGBEncoding;
renderer.shadowMap.type = VSMShadowMap;
renderer.shadowMap.autoUpdate = true;
renderer.shadowMap.needsUpdate = true;
renderer.shadowMap.enabled = true;

//renderer.shadowMap.type = THREE.PCFSoftShadowMap


/**
 * Camera
 */

renderer.shadowMap.enabled = true;

// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000)
//const camera = new THREE.OrthographicCamera( sizes.width / - 2, sizes.width / 2, sizes.height / 2, sizes.height / - 2, 1, 1000 );
camera.position.x = 0
camera.position.y = 0
camera.position.z = 40
//camera.layers.enable(0);
camera.layers.enable(1);

scene.add(camera)

const camera_pos = gui.addFolder("Camera")

camera_pos.add(camera.position, "x")
camera_pos.add(camera.position, "y")
camera_pos.add(camera.position, "z")



// Lights

const pointLight_1 = new THREE.PointLight(0xffffff, 10, 100)
pointLight_1.position.x =  0;
pointLight_1.position.y = 25
pointLight_1.position.z = -1
scene.add(pointLight_1)

// const pointLight_2 = new THREE.PointLight(0xffffff, 0.5)
// pointLight_2.position.x =  4;
// pointLight_2.position.y = 3
// pointLight_2.position.z = -1
// scene.add(pointLight_2)

const light_pos = gui.addFolder("light_post")

light_pos.add(pointLight_1.position,"x")
light_pos.add(pointLight_1.position,"y")
light_pos.add(pointLight_1.position,"z")

const pointLightHelper = new THREE.PointLightHelper(pointLight_1,1)
scene.add(pointLightHelper)

// Ambient Light
//0a0a0a
const ambientLight = new THREE.AmbientLight(0x0a0a0a, .5)

const pointLightHelper2 = new THREE.PointLightHelper(ambientLight,1)
scene.add(ambientLight)


// Objects
//const geometry = new THREE.SphereGeometry( 3, 32, 16 );
const geometry = new THREE.IcosahedronGeometry(1, 8);
const material = new THREE.MeshStandardMaterial( { color: 0xffff10 } );
const mat_color = new THREE.Color("#FF3366");
material.emissive = mat_color;
material.emissiveIntensity = 1;
material.roughness = 0.4;
material.metalness = 0.2;
material.wireframe = true;


const sun = new THREE.Mesh( geometry, material );
sun.position.x = window.innerWidth/500;
sun.position.y = 2;
sun.position.z = 6;
sun.castShadow = true; //default is false
sun.receiveShadow = true; //default
sun.layers.set(0);

//sun.layers.set(1)
//sun.add(light);
//group2.add(sun);
scene.add(sun);

const sun_pos = gui.addFolder("Sun")
sun_pos.add(sun.position, "x")
sun_pos.add(sun.position, "y")
sun_pos.add(sun.position, "z")
sun_pos.add(sun.material, "emissiveIntensity");
sun_pos.add(sun.material, "roughness");

const geometry_to = new THREE.TorusKnotGeometry(9, 2.7, 200, 14, 3, 4);
const material_to = new THREE.MeshToonMaterial( { color: 0xffff10 } );
const mat_color_to = new THREE.Color("#0D5D56");
material_to.emissive = mat_color_to;
material_to.emissiveIntensity = 1;
material_to.roughness = 0.4;
material_to.metalness = 1;
material_to.wireframe = false;

const torusKnot = new THREE.Mesh( geometry_to, material_to );

torusKnot.castShadow = true;
torusKnot.receiveShadow = true; //default

scene.add(torusKnot);
// Remova 
const sec_sphere = new THREE.IcosahedronGeometry(1, 6);
const material_sec = new THREE.MeshToonMaterial( { color: 0xffff10 } );

//const material_sec = new THREE.MeshStandardMaterial( { color: 0xffff10 } );
const mat_color_2 = new THREE.Color("#FFBA08");

material_sec.emissive = mat_color_2;
material_sec.emissiveIntensity = 1;
material_sec.roughness = 0.4;
material_sec.metalness = 0.2;
material_sec.wireframe = true;
material_sec.wireframeLinewidth = 100;
const sphere = new THREE.Mesh( sec_sphere, material_sec );

//sphere.layers.set(0)
sun.position.x = window.innerWidth/1000;
sun.position.y = 2;
sphere.position.z = 6;
sphere.castShadow = true;
sphere.receiveShadow = true;
//sphere.add(pointLight_2)
//group1.add(sphere)
scene.add(sphere)

const sec_sphere_ui = gui.addFolder("SecSphere")
sec_sphere_ui.add(sphere.position, "x")
sec_sphere_ui.add(sphere.position, "y")
sec_sphere_ui.add(sphere.position, "z")
sec_sphere_ui.add(sphere.material, "emissiveIntensity");
sec_sphere_ui.add(sphere.material, "roughness");


//const helper = new THREE.CameraHelper( light.shadow.camera );
//scene.add( helper );
// const helper_plane = new THREE.PlaneHelper( plane, 1, 0xffff00 );
// scene.add(helper_plane);


// FONT
const loader = new FontLoader();

const font = loader.load(
	// resource URL
	'assets/fonts/helvetiker_bold.typeface.json',

	// onLoad callback
	function ( font ) {
		// do something with the font
		console.log( font );
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.log( err );
	}
);// const text = new THREE.TextGeometry( 'Pet Pensieri', {
//   font: font,
//   size: 80,
//   height: 5,
//   curveSegments: 12,
//   bevelEnabled: true,
//   bevelThickness: 10,
//   bevelSize: 8,
//   bevelOffset: 0,
//   bevelSegments: 5
// } );
// scene.add(text)

// ROOM
const geometry_plane = new THREE.PlaneGeometry(300,   100);
const material_plane = new THREE.MeshStandardMaterial({color: "#F5853F", side: THREE.DoubleSide});
const plane_color = new THREE.Color("#F5853F");
material_plane.emissive = plane_color;
material_plane.emissiveIntensity = 1;
material_plane.roughness = 0.4;
material_plane.metalness = 0.9;
material_plane.wireframe = false;

const plane = new THREE.Mesh(geometry_plane, material_plane);
plane.rotation.x = 90
plane.position.z = -20;
plane.castShadow = true; //default is false
plane.receiveShadow = true; //default


scene.add(plane);

// const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
// scene.add(helper);



window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // update the position of the sun
    sun.position.x = sizes.width / 20
    sphere.position.x = sizes.width / 20 

})

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

//resize listner
window.addEventListener(
    "resize",
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );


function moveObject(object,elapsedTime, direction ){

  object.rotation.x = .5 * elapsedTime
  var new_position_x = (object.position.x +direction*(window.innerWidth/speed))
  var new_position_y = (object.position.y + -1* direction *(window.innerHeight/speed))


  if (new_position_x > window.innerWidth)
  {new_position_x = 0 };

  object.position.x = new_position_x;
  object.position.y = new_position_y;

}

/**
 * Animate
 */

var counter_update = 0;
var direction = 1;

const counter_switch = 100;
const speed = 100000

const clock = new THREE.Clock()

const tick = () =>
{

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    counter_update += 1
    renderer.autoClear = false;

    const elapsedTime = clock.getElapsedTime()

    // Update Orbital Controls
    controls.update()

    // Update objects
    if (counter_update > counter_switch){
      counter_update = 0
      direction *= -1
    }
    moveObject(pointLight_1,elapsedTime, direction);
    //moveObject(torusKnot,elapsedTime, direction);

    moveObject(sphere,elapsedTime, direction);
    moveObject(sun,elapsedTime*1.2, -1*direction)
    
    // Render non bloom area
    //camera.layers.set(0);
    renderer.render(scene, camera);


    
}

tick()