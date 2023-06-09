import * as THREE from 'three';
import './styles.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


//making the scene
const scene = new THREE.Scene();

//creating the material that will be in the scene
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ 
    color: "#00ff83",
    roughness: 0.5  //the quantity the material wil shine, the brigthness 
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Size of the the whole scene
const sizes = {
    width: window.innerWidth, //this helps the camera capture all the space avaliabe in the sreen
    height: window.innerHeight  //but with still not be responsive
}

//we can't see nothing with there's no light on the scene
//so we need lights

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 1.25;  //defaut is one
scene.add(light);

//camera
//the way you will look at the scene

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//render the scene that we've created above
//we do this with canvas

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})

// how big will be the canvas, and where to put it out
renderer.setSize(sizes.width, sizes.height);

//to let the pixel not so easily to see, dicrease this pixeling
renderer.setPixelRatio(2); //default is 1

renderer.render(scene, camera);

//adding controls
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const controls = new OrbitControls(camera, canvas);

//now to let the movimento of our cursor softer
controls.enableDamping = true;

//to disable the zoom and the possibility to drag the geometry
controls.enablePan = false;
controls.enableZoom = false;

//to have a auto-rotation
controls.autoRotate = true;
//to control the speed of the rotation
controls.autoRotateSpeed = 3;

//Resize
//because everytime we resize our screen we're changing the focus of the camera and of the scene
//so for not having the problem wiht the responsitivity we'll code below

window.addEventListener("resize", ()=> {
    //update the sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //now, the sizes will we always proporcinal with the size of the screen

    //we need to update the camera and render too,
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix(); 
    renderer.setSize(sizes.width, sizes.height); 
    //but with just this code we'll change the size of the whole element, 
    //which we don't want to, then we code:
})

//to every single time the we change the window/screen size,
//the size of the element will be update to the default

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop();

//and this code above will let the geo/figure estatic in the default size and position


//to animate the figure like changing the scale of it, we can use the library gsap
