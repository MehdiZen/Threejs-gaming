import * as THREE from "three";

// const scene = sceneSetup();
export default function checkCollision(
  wallUpBB: THREE.Box3,
  wallLeftBB: THREE.Box3,
  wallRightBB: THREE.Box3,
  wallBackBB: THREE.Box3,
  firstRoomWallRightBB: THREE.Box3,
  firstRoomWallLeftBB: THREE.Box3,
  crouchWallBB: THREE.Box3,
  shootWallBB: THREE.Box3,
  cameraBB: THREE.Box3,
  camera: THREE.PerspectiveCamera
) {
  cameraBB.intersectsBox(wallUpBB) ? camera.position.z += 0.1 : null
  cameraBB.intersectsBox(crouchWallBB) ? camera.position.z += 0.1 : null
  cameraBB.intersectsBox(shootWallBB) ? camera.position.z += 0.1 : null

  cameraBB.intersectsBox(wallLeftBB) ? camera.position.x += 0.1 : null
  cameraBB.intersectsBox(firstRoomWallLeftBB) ? camera.position.x += 0.1 : null

  cameraBB.intersectsBox(wallRightBB) ? camera.position.x += -0.1 : null
  cameraBB.intersectsBox(firstRoomWallRightBB) ? camera.position.x += -0.1 : null

  cameraBB.intersectsBox(wallBackBB) ? camera.position.z += -0.1 : null
}