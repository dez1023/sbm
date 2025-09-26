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
    if (collider != playerEntity.collision && collider.touching(playerEntity)) {
      const colliderObj = collider.gameObject;
      const diff = colliderObj.position.sub(playerEntity.position.sub(playerEntity.linearVelocity));
      if (Math.abs(diff.y) < colliderObj.size.y/2 + 20) {
        playerEntity.linearVelocity = playerEntity.linearVelocity.mult(new Vector3(0,1,1));
        playerEntity.position = playerEntity.position.mult(new Vector3(0,1,1)).add(new Vector3(colliderObj.position.x - (colliderObj.size.x/2 + 25.1) * Math.sign(diff.x)));
      }else{
        playerEntity.linearVelocity = playerEntity.linearVelocity.mult(new Vector3(1,0,1));
        playerEntity.position = playerEntity.position.mult(new Vector3(1,0,1)).add(new Vector3(0, colliderObj.position.y - (colliderObj.size.y/2 + 25.1) * Math.sign(diff.y) ));
      }
    }
  });
}
