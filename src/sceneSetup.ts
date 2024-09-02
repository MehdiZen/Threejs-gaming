import * as THREE from "three";
import { createWeapon } from "./weapon";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// import { addSphereEntityToScene, SphereEntity } from "./entity.ts";
// import { controlsSetup } from "./controlsSetup.ts";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
function createTextMesh(
  text: string,
  // @ts-ignore comment
  font: THREE.Font,
  material: THREE.Material,
  size: number
) {
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: size,
    depth: 0.01,
    curveSegments: 12,
  });
  return new THREE.Mesh(textGeometry, material);
}

export function sceneSetup(stage: {value: number}) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const bullets: THREE.Mesh[] = [];
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Wall creation
  const xwallGeometry = new THREE.BoxGeometry(10, 2, 1);
  const zwallGeometry = new THREE.BoxGeometry(1, 2, 10);
  const firstBackWallGeometry = new THREE.BoxGeometry(15, 2, 1);
  const smallWallGeometry = new THREE.BoxGeometry(3, 0.5, 1);
  const shootWallGeometry = new THREE.BoxGeometry(4, 1.1, 1);

  const materialBlack = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const materialBlue = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const materialGreen = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  const wallUp = new THREE.Mesh(xwallGeometry, materialBlue);
  const wallLeft = new THREE.Mesh(zwallGeometry, materialBlue);
  const wallRight = new THREE.Mesh(zwallGeometry, materialBlue);
  const wallBack = new THREE.Mesh(firstBackWallGeometry, materialBlack);
  const firstRoomWallRight = new THREE.Mesh(zwallGeometry, materialBlack);
  const firstRoomWallLeft = new THREE.Mesh(zwallGeometry, materialBlack);
  const crouchWall = new THREE.Mesh(smallWallGeometry, materialGreen);
  const shootWall = new THREE.Mesh(shootWallGeometry, materialGreen);

  //Targets creation
  let allTargets = [];

  const targetGeometry = new THREE.SphereGeometry( 1, 36, 16 ); 
  const targetMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 
  
  const firstTarget = new THREE.Mesh( targetGeometry, targetMaterial );
  const secondTarget = new THREE.Mesh( targetGeometry, targetMaterial ); 
  const thirdTarget = new THREE.Mesh( targetGeometry, targetMaterial ); 

  allTargets.push(firstTarget, secondTarget, thirdTarget);
  const raycaster = new THREE.Raycaster();
  raycaster.ray.origin.copy(camera.position);
  camera.getWorldDirection(raycaster.ray.direction);
  // Position
  // Wall
  wallUp.position.set(1, 0.5, 0);
  wallLeft.position.set(-7, 0.5, -5);
  wallRight.position.set(-3.5, 0.5, -5);
  wallBack.position.set(1, 0.5, 10);
  firstRoomWallLeft.position.set(-7, 0.5, 5);
  firstRoomWallRight.position.set(6.5, 0.5, 5);
  crouchWall.position.set(-5, 1, -5);
  shootWall.position.set(-5, 0.05, -10);

  firstTarget.position.set(6, 6, -35)
  secondTarget.position.set(-12, 6, -60)
  thirdTarget.position.set(0, 2, -35)

  const levelOneTargets = [];
  levelOneTargets.push(firstTarget, secondTarget, thirdTarget);
  const loader = new FontLoader();
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mediumFont = 0.5;
      const smallFont = 0.15;
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof TextGeometry) {
          scene.remove(child);
        }
      });
      if (stage.value === 1) {
        const wallUpText = createTextMesh(
          "Use WASD(ZQSD) to move",
          font,
          textMaterial,
          mediumFont
        );
        wallUpText.position.set(-4, 0, 0.6);
        wallUp.add(wallUpText);
        const croucWallText = createTextMesh(
          "Ctrl to crouch, friend",
          font,
          textMaterial,
          smallFont
        );
        croucWallText.position.set(-1.2, 0, 0.6);
        crouchWall.add(croucWallText);
      } else if (stage.value === 2) {
        const wallUpText = createTextMesh(
          "Deja vu ?",
          font,
          textMaterial,
          mediumFont
        );
        wallUpText.position.set(-4, 0, 0.6);
        wallUp.add(wallUpText);
      } else if (stage.value === 3) {
        const wallUpText = createTextMesh(
          "You are not getting out",
          font,
          textMaterial,
          mediumFont
        );
        wallUpText.position.set(-4, 0, 0.6);
        wallUp.add(wallUpText);
      }
    }
  );
  // console.log(stage.value);
  const plane = new THREE.GridHelper(1200, 1200, "blue", "green");
  plane.position.set(0, -0.5, 0);
  const light = new THREE.AmbientLight(0xffffff, 1);

  const flashlight = new THREE.SpotLight(0xffffff, 4, 40);
  camera.position.set(0, 1, 5);
  flashlight.target.updateMatrixWorld();

  const fullWeapon = createWeapon();
  camera.add(...fullWeapon);
  // Le cauchemar
  const cameraDirection = new THREE.Vector3();
  const controls = new PointerLockControls(camera, renderer.domElement);

  document.body.addEventListener("click", () => {
    controls.getObject().getWorldDirection(cameraDirection);
    let bullet = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    bullet.position.copy(controls.getObject().position.clone());
    bullet.position.add(cameraDirection.clone().multiplyScalar(0.11));

    bullet.userData = { direction: cameraDirection.clone().normalize() };

    bullets.push(bullet);
  });

  scene.add(
    camera,
    light,
    wallUp,
    wallBack,
    wallLeft,
    wallRight,
    firstRoomWallLeft,
    firstRoomWallRight,
    crouchWall,
    shootWall,
    ...allTargets,
    plane
  );

  return {
    scene,
    camera,
    renderer,
    stage,
    wallBack,
    wallUp,
    wallLeft,
    wallRight,
    firstRoomWallLeft,
    firstRoomWallRight,
    shootWall,
    crouchWall,
    ...fullWeapon,
    ...levelOneTargets,
    controls,
    bullets,
    allTargets,
    
  };
}
