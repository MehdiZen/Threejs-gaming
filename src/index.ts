import clearPlease, { sceneSetup } from "./sceneSetup";
import { controlsSetup } from "./controlsSetup";
import * as THREE from "three";
import { animate } from "./animate";
import { nitrodubsteplaboucle } from "./collision";
import { createWeapon } from "./weapon";

let stage = await nitrodubsteplaboucle();
let oldStage = stage.value;
let clear = false;
let {
  scene,
  camera,
  renderer,
  wallUp,
  wallBack,
  wallLeft,
  wallRight,
  firstRoomWallLeft,
  firstRoomWallRight,
  crouchWall,
  shootWall,
  controls,
  bullets,
  allTargets,
} = sceneSetup(stage);

controlsSetup(camera, controls);

function animateBullets() {
  bullets.forEach((bullet, index) => {
    if (!bullet.userData.direction) return;

    scene.add(bullet);
    const direction = bullet.userData.direction as THREE.Vector3;
    bullet.position.add(direction.clone().multiplyScalar(1));

    if (bullet.position.distanceTo(camera.position) > 100) {
      scene.remove(bullet);
      bullets.splice(index, 1);
    }
  });
}

renderer.setAnimationLoop(async () => {
  const newStage = await nitrodubsteplaboucle();
  if (newStage.value > oldStage) {
    clearPlease();
    oldStage = newStage.value;
    console.log(oldStage, newStage.value);
    ({
      scene,
      camera,
      // renderer,
      wallUp,
      wallBack,
      wallLeft,
      wallRight,
      firstRoomWallLeft,
      firstRoomWallRight,
      crouchWall,
      shootWall,
      controls,
      bullets,
      allTargets,
    } = sceneSetup(newStage));
    controlsSetup(camera, controls);
  }

  clear = false;
  animate(
    scene,
    wallUp,
    wallLeft,
    wallRight,
    wallBack,
    firstRoomWallRight,
    firstRoomWallLeft,
    crouchWall,
    shootWall,
    bullets,
    allTargets,
    camera
  );
  requestAnimationFrame(animateBullets);
  renderer.render(scene, camera);
});
