import * as THREE from "three";

interface IEntity {
  mesh: THREE.Mesh;
  HP: number;
  damage: number;
  takeDamage(amount: number): void;
  onDeath(): void;
}
class Entity implements IEntity {
  public mesh: THREE.Mesh;
  public HP: number;
  public damage: number;

  constructor(geometry: THREE.BoxGeometry | THREE.SphereGeometry, material: THREE.MeshBasicMaterial, HP: number, damage: number) {
    this.mesh = new THREE.Mesh(geometry, material);
    this.HP = HP;
    this.damage = damage;
  }

  takeDamage(amount:number) {
    this.HP -= amount;
    if (this.HP <= 0) {
      this.HP = 0;
      this.onDeath();
    }
  }

  onDeath() {
    console.log("Entity died");
  }
}

export class SphereEntity extends Entity {
  constructor() {
    const geometry = new THREE.SphereGeometry(1, 36, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const HP = 10;
    const damage = 0;

    super(geometry, material, HP, damage);
  }

  onDeath() {
    super.onDeath();
    console.log("SphereEntity destroyed");
  }
}

export function addSphereEntityToScene(scene: THREE.Scene, position: THREE.Vector3) {
  const sphereEntity = new SphereEntity();
  sphereEntity.mesh.position.copy(position);
  scene.add(sphereEntity.mesh);
  return sphereEntity;
}
