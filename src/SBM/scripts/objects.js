const objects = [];

class GameObject {
  // unity moment
  constructor(position) {
    this.position = position ?? new Vector3();
    objects.push(this);
  }
}

class Box extends GameObject {
  constructor(position, size, element) {
    super(position);
    this.size = size ?? Vector3.one;
    this.collision = new BoxCollision(this);
    this.element = element;
  }

  debugHighlight() {
    const element = document.createElement("div");
    element.style = `all: unset; position: absolute; border: 1px solid black; width: ${this.size.x}px; height: ${this.size.y}px;`;
    document.body.appendChild(element);
    Vector3.transformElement(element, this.position);
    return element;
  }
}

// replace the goofy ah with a sheet
function create3DFacesForBoxElement(box) {
  const boxElement = box.element;
  boxElement.style.transform += `translateZ(${box.position.z + box.size.z / 2}px)`;
  boxElement.style.transformStyle = "preserve-3d";
  const topFace = document.createElement("div");
  topFace.style = `background: lightgrey; width: 100%; height: ${box.size.z}px; left: 0; top: 0; transform: translate3d(0, -50%, ${-box.size.z / 2}px) rotateX(90deg);`;
  topFace.classList = "face-3d";
  const leftFace = topFace.cloneNode(false);
  leftFace.style = `background: darkgrey; width: ${box.size.z}px; height: 100%; left: 0; top: 0; transform: translate3d(-50%, 0, ${-box.size.z / 2}px) rotateY(270deg);`;
  const bottomFace = topFace.cloneNode(false);
  const rightFace = leftFace.cloneNode(false);

  Object.assign(bottomFace.style, {
    background: "darkgrey",
    top: "100%",
    transform: `translate3d(0, -50%, ${-box.size.z / 2}px) rotateX(270deg)`,
  });

  Object.assign(rightFace.style, {
    background: "darkgrey",
    left: "100%",
    transform: `translate3d(-50%, 0, ${-box.size.z / 2}px) rotateY(90deg)`,
  });

  boxElement.appendChild(topFace);
  boxElement.appendChild(bottomFace);
  boxElement.appendChild(leftFace);
  boxElement.appendChild(rightFace);
}

function createBoxFromElement(element) {
  // REPLASE him! agh!
  if (
    window.getComputedStyle(element).background ==
    "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
  ) {
    element.style.background = "inherit";
  }

  const rect = element.getBoundingClientRect();
  const box = new Box(
    new Vector3((rect.left + rect.right) / 2, rect.height / 2 - rect.bottom),
    new Vector3(rect.width, rect.height, 600),
    element,
  );
  const highlight = box.debugHighlight();
  const hlRect = highlight.getBoundingClientRect();
  box.position = box.position.sub(
    new Vector3(rect.left - hlRect.left, rect.top - hlRect.top),
  );
  highlight.remove();
  create3DFacesForBoxElement(box);
  //Vector3.transformElement(highlight, box.position);
  //body.appendChild(highlight);
}
