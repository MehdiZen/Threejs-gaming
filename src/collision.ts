import * as THREE from "three";

// const scene = sceneSetup();
export default function checkCollision(
  cube1BB: THREE.Box3,
  cameraBB: THREE.Box3,
  camera: THREE.PerspectiveCamera,
) {
  if (cameraBB.intersectsBox(cube1BB)) {
    camera.position.z -= -0.1
  }
}