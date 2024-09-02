import * as THREE from "three";
import checkCollision, { nitrodubsteplaboucle } from "./collision";

const wallUpBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const wallLeftBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const wallRightBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const wallBackBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const firstRoomWallRightBB = new THREE.Box3(
  new THREE.Vector3(),
  new THREE.Vector3()
);
const firstRoomWallLeftBB = new THREE.Box3(
  new THREE.Vector3(),
  new THREE.Vector3()
);
const crouchWallBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const shootWallBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const bulletBB = [new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())];
const targetBB = [new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())];

const cameraBB = new THREE.Box3(
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(1, 1, 1)
);

export function animate(
  scene: THREE.Scene,
  wallUp: THREE.Mesh,
  wallLeft: THREE.Mesh,
  wallRight: THREE.Mesh,
  wallBack: THREE.Mesh,
  firstRoomWallRight: THREE.Mesh,
  firstRoomWallLeft: THREE.Mesh,
  crouchWall: THREE.Mesh,
  shootWall: THREE.Mesh,
  bullets: THREE.Mesh[],
  allTargets: THREE.Mesh[],
  camera: any
) {
  wallUpBB.setFromObject(wallUp, true);
  wallLeftBB.setFromObject(wallLeft, true);
  wallRightBB.setFromObject(wallRight, true);
  wallBackBB.setFromObject(wallBack, true);
  firstRoomWallRightBB.setFromObject(firstRoomWallRight, true);
  firstRoomWallLeftBB.setFromObject(firstRoomWallLeft, true);
  crouchWallBB.setFromObject(crouchWall, true);
  shootWallBB.setFromObject(shootWall, true);
  while (allTargets.length > targetBB.length) {
    targetBB.push(new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()));
  }
  allTargets.forEach((target, index) => {
    targetBB[index].setFromObject(target, true);
  });

  cameraBB.setFromObject(camera, true);

  checkCollision(
    scene,
    allTargets,
    wallUpBB,
    wallLeftBB,
    wallRightBB,
    wallBackBB,
    firstRoomWallRightBB,
    firstRoomWallLeftBB,
    crouchWallBB,
    shootWallBB,
    bulletBB,
    targetBB,
    cameraBB,
    camera,
    bullets
  );
}
