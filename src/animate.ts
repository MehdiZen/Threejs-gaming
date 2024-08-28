import * as THREE from "three";
import checkCollision from "./collision";

const wallUpBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const wallLeftBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const wallRightBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const wallBackBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const firstRoomWallRightBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const firstRoomWallLeftBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

const cameraBB = new THREE.Box3(
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(1, 1, 1)
);

export function animate(
  wallUp: THREE.Mesh,
  wallLeft: THREE.Mesh,
  wallRight: THREE.Mesh,
  wallBack: THREE.Mesh,
  firstRoomWallRight: THREE.Mesh,
  firstRoomWallLeft: THREE.Mesh,
  camera: any
) {
  wallUpBB.setFromObject(wallUp, true);
  wallLeftBB.setFromObject(wallLeft, true);
  wallRightBB.setFromObject(wallRight, true);
  wallBackBB.setFromObject(wallBack, true);
  firstRoomWallRightBB.setFromObject(firstRoomWallRight, true);
  firstRoomWallLeftBB.setFromObject(firstRoomWallLeft, true);

  cameraBB.setFromObject(camera, true);

  checkCollision(
    wallUpBB,
    wallLeftBB,
    wallRightBB,
    wallBackBB,
    firstRoomWallRightBB,
    firstRoomWallLeftBB,
    cameraBB,
    camera
  );
}
