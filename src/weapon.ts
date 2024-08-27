import * as THREE from 'three';

export function createWeapon(): THREE.Mesh {
  const weaponGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.6); 
  const weaponMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
  const weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
  return weapon;
}
