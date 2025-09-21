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