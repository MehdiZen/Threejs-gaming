import * as THREE from "three";
let targetCount = 0;
let stage = { value: 1 };

export default function checkCollision(
  scene: THREE.Scene,
  allTargets: THREE.Mesh[],
  wallUpBB: THREE.Box3,
  wallLeftBB: THREE.Box3,
  wallRightBB: THREE.Box3,
  wallBackBB: THREE.Box3,
  firstRoomWallRightBB: THREE.Box3,
  firstRoomWallLeftBB: THREE.Box3,
  crouchWallBB: THREE.Box3,
  shootWallBB: THREE.Box3,
  bulletBB: THREE.Box3[],
  targetBB: THREE.Box3[],
  cameraBB: THREE.Box3,
  camera: THREE.PerspectiveCamera,
  bullets: THREE.Mesh[]
) {
  cameraBB.intersectsBox(wallUpBB) ? (camera.position.z += 0.1) : null;
  cameraBB.intersectsBox(crouchWallBB) ? (camera.position.z += 0.1) : null;
  cameraBB.intersectsBox(shootWallBB) ? (camera.position.z += 0.1) : null;

  bullets.forEach((bullet, index) => {
    if (bulletBB.length < bullets.length) {
      bulletBB.push(new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()));
    }

    bulletBB[index].setFromObject(bullet);

    const hitWall =
      bulletBB[index].intersectsBox(wallUpBB) ||
      bulletBB[index].intersectsBox(wallLeftBB) ||
      bulletBB[index].intersectsBox(wallRightBB) ||
      bulletBB[index].intersectsBox(wallBackBB) ||
      bulletBB[index].intersectsBox(crouchWallBB) ||
      bulletBB[index].intersectsBox(shootWallBB) ||
      bulletBB[index].intersectsBox(firstRoomWallRightBB) ||
      bulletBB[index].intersectsBox(firstRoomWallLeftBB);

    if (hitWall) {
      scene.remove(bullet);
      bullets.splice(index, 1);
      bulletBB.splice(index, 1);
      return;
    }

    targetBB.forEach((TBB, targetIndex) => {
      if (bulletBB[index] && bulletBB[index].intersectsBox(TBB)) {
        scene.remove(allTargets[targetIndex]);
        allTargets.splice(targetIndex, 1);
        targetBB.splice(targetIndex, 1);
        scene.remove(bullet);
        bullets.splice(index, 1);
        bulletBB.splice(index, 1);
        targetCount++;
        return;
      }
    });
  });

  cameraBB.intersectsBox(wallLeftBB) ? (camera.position.x += 0.1) : null;
  cameraBB.intersectsBox(firstRoomWallLeftBB)
    ? (camera.position.x += 0.1)
    : null;

  cameraBB.intersectsBox(wallRightBB) ? (camera.position.x += -0.1) : null;
  cameraBB.intersectsBox(firstRoomWallRightBB)
    ? (camera.position.x += -0.1)
    : null;

  cameraBB.intersectsBox(wallBackBB) ? (camera.position.z += -0.1) : null;
  if (targetCount === 3) {
    stage.value++;
    targetCount = 0;
    return;
  }
}

export function nitrodubsteplaboucle(): Promise<{ value: number }> {
  return new Promise((resolve) => {
    resolve(stage);
  });
}
