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

function collide(entity, colliderObj, dir, axis, diff) {
  const subDir = Vector3.one.sub(dir);
  entity.linearVelocity = entity.linearVelocity.mult(subDir);
  entity.position = entity.position.mult(subDir).add(
    dir.mult(colliderObj.position[axis] - (colliderObj.size[axis] / 2 + 25.1) * Math.sign(diff[axis]))
  );
}

function bunsCollisions() {
  colliders.forEach((collider) => {
    plrEntity = SBM.playerEntity;
    if (collider != plrEntity.collision && collider.touching(plrEntity)) {
      const colliderObj = collider.gameObject;
      const diff = colliderObj.position.sub(
        plrEntity.position.sub(plrEntity.linearVelocity),
      );
      if (Math.abs(diff.y) < colliderObj.size.y / 2 + 20) {
        if (Math.abs(diff.z) < colliderObj.size.z / 2) {
          collide(plrEntity, colliderObj, new Vector3(1), "x", diff);
        } else {
          collide(plrEntity, colliderObj, new Vector3(0,0,1), "z", diff);
        }
      } else {
        collide(plrEntity, colliderObj, new Vector3(0,1), "y", diff);
      }
    }
  });
}
