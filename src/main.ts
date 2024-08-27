import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry( 1, 1, 1 );

const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const material3 = new THREE.MeshBasicMaterial( { color: 0xff0000} );
const cube = new THREE.Mesh( geometry, material );
const cube2 = new THREE.Mesh( geometry, material2 );
const cube3 = new THREE.Mesh( geometry, material3 );
cube.position.y = 1
cube2.position.y = 1
cube3.position.y = 1
cube.position.x = 1
cube2.position.x = -1
cube3.position.x = 3
scene.add( cube, cube2, cube3, new THREE.GridHelper(1200, 1200) );

camera.position.z = 5;
camera.position.y = 1;
if (camera.position.y < 0){
  camera.position.y = 0
}
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube2.rotation.x -= 0.01;
  cube2.rotation.y -= 0.01;
  cube3.rotation.x += 0.01;
  cube3.rotation.y -= 0.01;
  // fps.update(0.05);
  // controls.autoForward = false
	renderer.render( scene, camera );
}

const fps = new PointerLockControls(camera, renderer.domElement)
{
}

document.body.addEventListener('click', () => {
  fps.lock()
  fps.connect()
})
let speedMultiplier = 1;

document.body.addEventListener('keydown', (e) => {
  if(e.key === "Shift"){
    speedMultiplier = speedMultiplier === 1 ? 0.5 : 1
    console.log(speedMultiplier);
  }
  if( e.key == "z"){
    fps.moveForward(0.1 * speedMultiplier);
  }
    else if( e.key == "s"){
      fps.moveForward(-0.1* speedMultiplier);
   }
  if( e.key == "d"){
    fps.moveRight(0.1* speedMultiplier);
  }
    else if( e.key == "q"){
      fps.moveRight(-0.1* speedMultiplier);
    }
})

// const controls = new FirstPersonControls(camera, renderer.domElement )
// {
// controls.heightMin = 0
// controls.activeLook = false

// }

renderer.setAnimationLoop( animate );