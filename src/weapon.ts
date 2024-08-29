import * as THREE from 'three';

export function createWeapon(): THREE.Mesh[] {
  let fullWeapon = []
  const armGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.55); 
  const armMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
  const arm = new THREE.Mesh(armGeometry, armMaterial);

  const armOutlineGeometry = new THREE.BoxGeometry(0.21, 0.21, 0.55); 
  const armOutlineMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide, color: 0x000000 });
  const armOutline = new THREE.Mesh(armOutlineGeometry, armOutlineMaterial);

  const crossGeometry = new THREE.BoxGeometry(0.2, 0.37, 0.1); 
  const crossMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00000 });
  const cross = new THREE.Mesh(crossGeometry, crossMaterial);

  const crossOutlineGeometry = new THREE.BoxGeometry(0.21, 0.38, 0.11); 
  const crossOutlineMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide, color: 0x000000 });
  const crossOutline = new THREE.Mesh(crossOutlineGeometry, crossOutlineMaterial);

  const barrelGeometry = new THREE.BoxGeometry(0.15, 0.2, 0.5); 
  const barrelMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00000 });
  const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);

  const barrelOutlineGeometry = new THREE.BoxGeometry(0.16, 0.21, 0.51); 
  const barrelOutlineMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide, color: 0x000000 });
  const barrelOutline = new THREE.Mesh(barrelOutlineGeometry, barrelOutlineMaterial);


  arm.position.set(0.4, -0.5, -0.70);
  armOutline.position.set(0.4, -0.5, -0.70)
  cross.position.set(0.4, -0.6, -1.1);
  crossOutline.position.set(0.4, -0.6, -1.1);
  barrel.position.set(0.3, -0.2, -1);
  barrelOutline.position.set(0.3, -0.2, -1);


  fullWeapon.push(arm, cross, barrel, barrelOutline, crossOutline, armOutline)
  return fullWeapon;
}

