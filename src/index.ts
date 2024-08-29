import { sceneSetup } from "./sceneSetup";
import { controlsSetup } from "./controlsSetup";
import * as THREE from "three";
import { animate } from "./animate";

const {
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
} = sceneSetup();
controlsSetup(camera, controls);

function animateBullets() {
  bullets.forEach((bullet, index) => {

    if (!bullet.userData.direction) return;
    
    scene.add(bullet);
    const direction = bullet.userData.direction as THREE.Vector3;
    bullet.position.add(direction.clone().multiplyScalar(0.1));
    
    setTimeout(() => {
      scene.remove(bullet);
      bullets.splice(index, 1);
    }, 8000)
  });
}

renderer.setAnimationLoop(() => {
  animate(
    wallUp,
    wallLeft,
    wallRight,
    wallBack,
    firstRoomWallRight,
    firstRoomWallLeft,
    crouchWall,
    shootWall,
    camera
  );
  requestAnimationFrame(animateBullets);
  renderer.render(scene, camera);
});
