import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { MaterialLoader } from 'three'
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
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
// scene.background = color_bg;
/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// //
// const group1 = new THREE.Group()
// group1.layers.set(1)
// const group2 =  new THREE.Group()
// group2.layers.set(0)
// scene.add(group1,group2)

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

/**
 * Camera
 */

 renderer.shadowMap.enabled = true;
 //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
 
 //Create a DirectionalLight and turn on shadows for the light
//  const light = new THREE.DirectionalLight( 0xffffff, 0, 100 );
//  light.position.set( 0, 20, -20 ); //default; light shining from top
//  light.castShadow = true; // default false
//  const light_dire = gui.addFolder("Light")

//  light_dire.add(light.position, "x")
//  light_dire.add(light.position, "y")
//  light_dire.add(light.position, "z")

 //scene.add(light);
 
 //Set up shadow properties for the light
//  light.shadow.mapSize.width = 520; // default
//  light.shadow.mapSize.height = 520; // default
//  light.shadow.camera.near = 0.5; // default
//  light.shadow.camera.far = 1000; // default


// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000)
//const camera = new THREE.OrthographicCamera( sizes.width / - 2, sizes.width / 2, sizes.height / 2, sizes.height / - 2, 1, 1000 );
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
//camera.layers.enable(0);
camera.layers.enable(1);

scene.add(camera)

const camera_pos = gui.addFolder("Camera")

camera_pos.add(camera.position, "x")
camera_pos.add(camera.position, "y")
camera_pos.add(camera.position, "z")



// Lights

const pointLight_1 = new THREE.PointLight(0xffffff, 0.5)
pointLight_1.position.x =  4;
pointLight_1.position.y = 0
pointLight_1.position.z = -1
scene.add(pointLight_1)

const pointLight_2 = new THREE.PointLight(0xffffff, 0.5)
pointLight_2.position.x =  4;
pointLight_2.position.y = 3
pointLight_2.position.z = -1
scene.add(pointLight_2)

const light_pos = gui.addFolder("light_post")

light_pos.add(pointLight_1.position,"x")
light_pos.add(pointLight_1.position,"y")
light_pos.add(pointLight_1.position,"z")

const pointLightHelper = new THREE.PointLightHelper(pointLight_1,1)
scene.add(pointLightHelper)

// Ambient Light
const ambientLight = new THREE.AmbientLight( 0xffffff ) 
scene.add(ambientLight);

// Objects
//const geometry = new THREE.SphereGeometry( 3, 32, 16 );
const geometry = new THREE.IcosahedronGeometry(1, 15);
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
sun.position.z = -10;
sun.castShadow = true; //default is false
sun.receiveShadow = true; //default
sun.add(pointLight_1);
sun.layers.set(1);

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

// Remova 
const sec_sphere = new THREE.IcosahedronGeometry(1, 15);
const material_sec = new THREE.MeshStandardMaterial( { color: 0xffff10 } );
const sphere = new THREE.Mesh( sec_sphere, material_sec );

//sphere.layers.set(0)
sphere.position.z = -10;

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


//bloom renderer
const renderScene = new RenderPass(scene, camera);
renderScene.clearAlpha = 0;

// var fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
// fxaaPass.uniforms.resolution.value.set( 1 / window.innerWidth, 1 / window.innerHeight );
// fxaaPass.renderToScreen = true;
// fxaaPass.material.transparent = true;

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);

bloomPass.renderToScreen = true;
bloomPass.threshold = 0;
bloomPass.strength = 1.0; //intensity of glow
bloomPass.radius = 1;

const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;

bloomComposer.addPass(renderScene);
//bloomComposer.addPass(fxaaPass);
bloomComposer.addPass(bloomPass);





const effect = gui.addFolder("Effect")
effect.add(bloomPass, "strength")
effect.add(bloomPass, "radius")


//renderer.gammaInput = true
//renderer.gammaOutput = true
//renderer.toneMappingExposure = Math.pow( 0.9, 4.0 ) 

//bloomComposer.render()

// const composer = new EffectComposer(renderer);
// composer.addPass(new RenderPass(scene, camera));
// const bloomOptions = {
//   blendFunction: BlendFunction.SCREEN,
//   kernelSize: KernelSize.VERY_SMALL,
//   luminanceThreshold: 0.5,
//   luminanceSmoothing: 0.5,
//   blurscale : 0.2,
//   intensity: 2,
//   height: 1000
// };
// const bloom = new BloomEffect(bloomOptions);

//composer.addPass(new EffectPass(camera,bloom ));


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

    bloomComposer.setSize(window.innerWidth, window.innerHeight);

    // update the position of the sun
    sun.position.x = sizes.width / 20

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
      bloomComposer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    renderer.autoClear = false;

    const elapsedTime = clock.getElapsedTime()

    // Update Orbital Controls
    controls.update()

    // Update objects
    sun.rotation.y = .5 * elapsedTime
    sun.position.x = window.innerWidth/500;
    
    // Render bloom Area
    renderer.clear();
    camera.layers.set(1);
    //composer.render();
    bloomComposer.render();
    
    // Render non bloom area
    renderer.clearDepth();
    camera.layers.set(0);
    renderer.render(scene, camera);

    // Render bloom Area
    // renderer.clear();
    // camera.layers.set(1);
    // bloomComposer.render();
    

}



tick()