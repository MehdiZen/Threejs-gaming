// import * as THREE from 'three';
// import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
// // Scene setup ---------------------------------------------------------------
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );

// // Environment setup ---------------------------------------------------------------
//     // Cubes
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
// const material3 = new THREE.MeshBasicMaterial( { color: 0xff0000} );
// const cube = new THREE.Mesh( geometry, material );
// const cube2 = new THREE.Mesh( geometry, material2 );
// const cube3 = new THREE.Mesh( geometry, material3 );
// cube.position.y = 0.5
// cube2.position.y = 1
// cube3.position.y = 1
// cube.position.x = 1
// cube2.position.x = -1
// cube3.position.x = 3
//     // Ground mesh
// let map
// const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
// // const light = new THREE.AmbientLight(0xFFFFFF, 1);
// var texture = new THREE.TextureLoader().load( 'src/skybox/close-up-mixture-clay-powder.jpg' );
// // var planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
// const planeMaterial = new THREE.MeshBasicMaterial( {color: "grey", side: THREE.DoubleSide} );

// const flashlight = new THREE.SpotLight(0xffffff,4,40);
// camera.add(flashlight);
// flashlight.position.set(0,0,1);
// flashlight.target = camera;
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.receiveShadow = true;

// map = plane;
// // const level = 1;
// // if(level === 1){
// // map = new THREE.GridHelper(1200, 1200);
// // }
// plane.rotation.x = Math.PI /2; 
// plane.receiveShadow = true;
// plane.rotation.x = -0.5 * Math.PI;
// plane.position.set(0,0,0);
// // light,
// scene.add( map, cube, cube2, cube3 );
// camera.position.z = 5;
// camera.position.y = 1;
// if (camera.position.y < 0){
//   camera.position.y = 0
// }

//   // Weapon
// let mesh = new THREE.Mesh( new THREE.SphereGeometry( 1, 1, 1 ), new THREE.MeshNormalMaterial() );
// mesh.position.z = 0; // some negative number


// function animate() {
//   cube2.rotation.x -= 0.01;
//   cube2.rotation.y -= 0.01;
//   cube3.rotation.x += 0.01;
//   cube3.rotation.y -= 0.01;
// 	renderer.render( scene, camera );

// }
// // Controls setup ---------------------------------------------------------------
// const fps = new PointerLockControls(camera, renderer.domElement)
// {
// }

// document.body.addEventListener('click', () => {
//   fps.lock()
// })

// let speedMultiplier = 1;
// document.body.addEventListener('keydown', (e) => {
//   if(e.key === "Shift"){
//     speedMultiplier = speedMultiplier === 1 ? 0.5 : 1
//     console.log(speedMultiplier);
//   }
//   if(e.key === "Control"){
//     camera.position.y = camera.position.y === 1 ? 0.5 : 1;
//   }
//   if( e.key == "z"){
//     fps.moveForward(0.1 * speedMultiplier);
//   }
//     else if( e.key == "s"){
//       fps.moveForward(-0.1* speedMultiplier);
//    }
//   if( e.key == "d"){
//     fps.moveRight(0.1* speedMultiplier);
//   }
//     else if( e.key == "q"){
//       fps.moveRight(-0.1* speedMultiplier);
//     }
// })
// renderer.setAnimationLoop( animate );