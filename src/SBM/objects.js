const objects = [];

class GameObject {
  // unity moment
  constructor(position) {
    this.position = position ?? new Vector3();
    objects.push(this);
  }
}

class Box extends GameObject {
  constructor(position, size) {
    super(position);
    this.size = size ?? Vector3.one;
    this.collision = new BoxCollision(this);
  }

  debugHighlight() {
    const element = document.createElement("div");
    element.style = `all: unset; position: absolute; border: 1px solid black; width: ${this.size.x}px; height: ${this.size.y}px;`;
    document.body.appendChild(element);
    Vector3.transformElement(element, this.position);
    return element;
  }
}

function createBoxFromElement(element) {
  const rect = element.getBoundingClientRect();
  const box = new Box(
    new Vector3((rect.left + rect.right) / 2, rect.height / 2 - rect.bottom),
    new Vector3(rect.width, rect.height),
  );
  const highlight = box.debugHighlight();
  const hlRect = highlight.getBoundingClientRect();
  box.position = box.position.sub(
    new Vector3(rect.left - hlRect.left, rect.top - hlRect.top),
  );
  //highlight.remove();
  Vector3.transformElement(highlight, box.position);
  body.appendChild(highlight);
}