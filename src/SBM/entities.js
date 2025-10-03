const entities = [];

class Entity extends GameObject {
  rotateWithCamera = false;
  
  constructor(position, size) {
    super(position);
    this.size = size;
    this.rotation = new Vector3;
    this.element = document.createElement("canvas");
    entities.push(this);
  }

  frameUpdate() {
    const rot = this.rotateWithCamera ? this.rotation.add(new Vector3(0, -SBM.currentCamera.rotation.y)) : this.rotation;
    Vector3.transformElement(this.element, this.position, rot);
  }
}

class LivingEntity extends Entity {
  moveDirection = new Vector3();
  linearVelocity = new Vector3();

  constructor(position, size, health = 1, maxHealth = 1) {
    super(position, size);
    this.health = health;
    this.maxHealth = maxHealth;
    this.collision = new BoxCollision(this);
  }

  frameUpdate() {
    super.frameUpdate();
    this.position = this.position.add(this.linearVelocity);
    this.linearVelocity = this.linearVelocity
      .add(this.moveDirection)
      .mult(new Vector3(0.9, 0.98, 0.9));
  }
}
