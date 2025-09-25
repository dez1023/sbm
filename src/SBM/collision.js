const colliders = [];

class Collision {
  constructor(gameObject) {
    this.gameObject = gameObject;
  }
}

function AABBIntersect(A, B) {
  const AHalfSize = A.size.div(2);
  const BHalfSize = B.size.div(2);
  const AMin = A.position.sub(AHalfSize);
  const BMin = B.position.sub(BHalfSize);
  const AMax = A.position.add(AHalfSize);
  const BMax = B.position.add(BHalfSize);

  return (
    AMin.x <= BMax.x &&
    AMax.x >= BMin.x &&
    AMin.y <= BMax.y &&
    AMax.y >= BMin.y &&
    AMin.z <= BMax.z &&
    AMax.z >= BMin.z
  );
}

class BoxCollision extends Collision {
  constructor(gameObject) {
    super(gameObject);
    colliders.push(this);
  }

  touching(gameObject) {
    return AABBIntersect(gameObject, this.gameObject);
  }
}

function bunsCollisions() {
  colliders.forEach((collider) => {
    if (collider != mario.collision && collider.touching(mario)) {
      const colliderObj = collider.gameObject;
      const diff = colliderObj.position.sub(mario.position);

      if (Math.abs(diff.y - 25) < colliderObj.size.y/2) {
        mario.linearVelocity = mario.linearVelocity.mult(new Vector3(0,1,1));
        mario.position = mario.position.mult(new Vector3(0,1,1)).add(new Vector3(colliderObj.position.x - (colliderObj.size.x/2 + 25.5) * Math.sign(diff.x)) );
      }else{
        mario.linearVelocity = mario.linearVelocity.mult(new Vector3(1, 0, 1));
        mario.position = mario.position.mult(new Vector3(1,0,1)).add(new Vector3(0, colliderObj.position.y + colliderObj.size.y/2 + 25.5));
      }

    }
  });
}
