import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import * as THREE from "three";

export function controlsSetup(
  camera: THREE.PerspectiveCamera,
  domElement: HTMLElement
) {
  const fps = new PointerLockControls(camera, domElement);

  let speedMultiplier = 1;
  const keyMap: { [key: string]: boolean } = {};

  document.body.addEventListener("keydown", (e) => {
    keyMap[e.key] = true;
    userMovement(e);
  });

  function userMovement(e: KeyboardEvent) {
      // IF FOREST NO JUTSU
    if (e.key === "Shift") {
      speedMultiplier = speedMultiplier === 1 ? 0.5 : 1;
    }
    if (e.key === "Control") {
      camera.position.y = camera.position.y === 1 ? 0.5 : 1;
    }
    if (e.key === " ") {
        camera.position.y = 2;
         setTimeout(function() {
            camera.position.y = 1;
        }, 300);
      }
    if (keyMap["z"] && keyMap["d"]) {
      fps.moveForward((0.1 * speedMultiplier) / 2);
      fps.moveRight((0.1 * speedMultiplier) / 2);
    } else if (keyMap["z"] && keyMap["q"]) {
      fps.moveForward((0.1 * speedMultiplier) / 2);
      fps.moveRight((-0.1 * speedMultiplier) / 2);
    } else if (keyMap["s"] && keyMap["d"]) {
      fps.moveForward((-0.1 * speedMultiplier) / 2);
      fps.moveRight((0.1 * speedMultiplier) / 2);
    } else if (keyMap["s"] && keyMap["q"]) {
      fps.moveForward((-0.1 * speedMultiplier) / 2);
      fps.moveRight((-0.1 * speedMultiplier) / 2);
    } else if (e.key === "z") {
      fps.moveForward(0.1 * speedMultiplier);
    } else if (e.key === "s") {
      fps.moveForward(-0.1 * speedMultiplier);
    } else if (e.key === "d") {
      fps.moveRight(0.1 * speedMultiplier);
    } else if (e.key === "q") {
      fps.moveRight(-0.1 * speedMultiplier);
    }
  }
  document.body.addEventListener("keyup", (e: KeyboardEvent) => {
    keyMap[e.key] = false;
  });
  return fps;
}
