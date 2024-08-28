import * as THREE from "three";
import { createWeapon } from "./weapon";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function createTextMesh(text: string, font: THREE.Font, material: THREE.Material) {
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 0.5,
    height: 0.1,
    curveSegments: 12,
  });
  return new THREE.Mesh(textGeometry, material);
}

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
  const xwallgeometry = new THREE.BoxGeometry(10, 2, 1);
  const zwallgeometry = new THREE.BoxGeometry(1, 2, 10);
  const firstBackWall = new THREE.BoxGeometry(15, 2, 1);


  const materialGreen = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const materialRed = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  
  const wallUp = new THREE.Mesh(xwallgeometry, materialRed);
  const wallLeft = new THREE.Mesh(zwallgeometry, materialRed);
  const wallRight = new THREE.Mesh(zwallgeometry, materialRed);
  const wallBack = new THREE.Mesh(firstBackWall, materialGreen);
  const firstRoomWallRight = new THREE.Mesh(zwallgeometry, materialGreen);
  const firstRoomWallLeft = new THREE.Mesh(zwallgeometry, materialGreen);



  const raycaster = new THREE.Raycaster();
  raycaster.ray.origin.copy(camera.position);
  camera.getWorldDirection(raycaster.ray.direction);

  wallUp.position.set(1, 0.5, 0);
  wallLeft.position.set(-7, 0.5, -5);
  wallRight.position.set(-3.5, 0.5, -5);
  wallBack.position.set(1, 0.5, 10);
  firstRoomWallLeft.position.set(-7, 0.5, 5);
  firstRoomWallRight.position.set(6.5, 0.5, 5);


  const loader = new FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const wallUpText = createTextMesh("Use WASD(ZQSD) to move", font, textMaterial);
    wallUpText.position.set(-4, 0, 0.6);
    wallUp.add(wallUpText);
  
  });

  const plane = new THREE.GridHelper(1200, 1200, "blue", "green");
  plane.position.set(0, -0.5, 0);
  const light = new THREE.AmbientLight(0xffffff, 1);

  const flashlight = new THREE.SpotLight(0xffffff, 4, 40);
  camera.position.set(0, 1, 5);
  flashlight.target.updateMatrixWorld();

  const weapon = createWeapon();
  camera.add(weapon);
  weapon.position.set(0.4, -0.5, -0.8);

  camera.position.set(0, 1, 5);

  scene.add(camera, light, wallUp, wallBack, wallLeft, wallRight, firstRoomWallLeft, firstRoomWallRight, plane);

  return { scene, camera, renderer, wallBack, wallUp, wallLeft, wallRight, firstRoomWallLeft, firstRoomWallRight };
}
