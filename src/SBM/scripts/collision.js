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
    if (collider != SBM.playerEntity.collision && collider.touching(SBM.playerEntity)) {
      const colliderObj = collider.gameObject;
      const diff = colliderObj.position.sub(SBM.playerEntity.position.sub(SBM.playerEntity.linearVelocity));
      if (Math.abs(diff.y) < colliderObj.size.y/2 + 20) {
        SBM.playerEntity.linearVelocity = SBM.playerEntity.linearVelocity.mult(new Vector3(0,1,1));
        SBM.playerEntity.position = SBM.playerEntity.position.mult(new Vector3(0,1,1)).add(new Vector3(colliderObj.position.x - (colliderObj.size.x/2 + 25.1) * Math.sign(diff.x)));
      }else{
        SBM.playerEntity.linearVelocity = SBM.playerEntity.linearVelocity.mult(new Vector3(1,0,1));
        SBM.playerEntity.position = SBM.playerEntity.position.mult(new Vector3(1,0,1)).add(new Vector3(0, colliderObj.position.y - (colliderObj.size.y/2 + 25.1) * Math.sign(diff.y) ));
      }
    }
  });
}
