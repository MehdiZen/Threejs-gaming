import * as THREE from "three";
import checkCollision from "./collision";

const cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const cameraBB = new THREE.Box3(
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(1, 1, 1)
);

export function animate(
  wall: THREE.Mesh,
  camera: any
)
{
  cube1BB.setFromObject(wall, true);
  cameraBB.setFromObject(camera, true);

  checkCollision(cube1BB, cameraBB, camera);
}
