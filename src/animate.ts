import * as THREE from 'three';

// Prend les cubes en paramètre pour les manipuler
export function animate(_cube1: THREE.Mesh, cube2: THREE.Mesh, cube3: THREE.Mesh) {
  if (cube2) {
    cube2.rotation.x -= 0.01;
    cube2.rotation.y -= 0.01;
  }
  if (cube3) {
    cube3.rotation.x += 0.01;
    cube3.rotation.y -= 0.01;
  }
}
