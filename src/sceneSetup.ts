import * as THREE from "three";
import { createWeapon } from "./weapon";
// import { createWeapon } from "./weapon";
export function sceneSetup() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const material3 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const cube1 = new THREE.Mesh(geometry, material);
  const cube2 = new THREE.Mesh(geometry, material2);
  const cube3 = new THREE.Mesh(geometry, material3);

  cube1.position.y = 0.5;
  cube2.position.y = 1;
  cube3.position.y = 1;
  cube1.position.x = 1;
  cube2.position.x = -1;
  cube3.position.x = 3;

  //   const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
  //   const planeMaterial = new THREE.MeshBasicMaterial({ color: "grey", side: THREE.DoubleSide });
  const plane = new THREE.GridHelper(1200, 1200, "blue", "green");
  //   const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  //   plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, 0, 0);
  const light = new THREE.AmbientLight(0xffffff, 1);

  const flashlight = new THREE.SpotLight(0xffffff, 4, 40);
  camera.position.set(0, 1, 5);
  flashlight.target.updateMatrixWorld();

//   var mesh = new THREE.Mesh(
//     new THREE.SphereGeometry(5, 16, 8),
//     new THREE.MeshNormalMaterial()
//   );
//   mesh.position.z = -100;
//   camera.add(mesh);
  const weapon = createWeapon();
camera.add(weapon);
weapon.position.set(0.4, -0.5, -0.8); // Ajuste la position de l'arme par rapport à la caméra

// Positionner la caméra
camera.position.set(0, 1, 5);

  scene.add(camera, light, cube1, cube2, cube3, plane);

  return { scene, camera, renderer, cube1, cube2, cube3 };
}
