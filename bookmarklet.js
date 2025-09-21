// ---------------------------- index.js

const wWidth = window.innerWidth;
const wHeight = window.innerHeight;
console.log(`window - width: ${wWidth} height: ${wHeight}`);

// ---------------------------- utils.js
const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

function doMath(num1, operator, num2) {
  if (operations[operator]) {
    return operations[operator](num1, num2);
  } else {
    return;
  }
}

class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  #math(operator, arg) {
    const vec3 = arg instanceof Vector3 ? arg : new Vector3(arg, arg, arg);
    return new Vector3(
      doMath(this.x, operator, vec3.x),
      doMath(this.y, operator, vec3.y),
      doMath(this.z, operator, vec3.z),
    );
  }

  add = (arg) => this.#math("+", arg);
  sub = (arg) => this.#math("-", arg);
  mult = (arg) => this.#math("*", arg);
  div = (arg) => this.#math("/", arg);

  static one = new Vector3(1, 1, 1);

  static transformElement(element, vec3) {
    const rect = element.getBoundingClientRect();
    element.style.left = vec3.x - rect.width / 2 + "px";
    element.style.top = -vec3.y - rect.height / 2 + "px";
  }
}

function GetTextOfElement(element) {
  return [].reduce.call(
    element.childNodes,
    function (a, b) {
      return a + (b.nodeType === 3 ? b.textContent : "");
    },
    "",
  );
}

function isStringBlank(str) {
  return str === null || str === undefined || str.trim().length === 0;
}

// ---------------------------- collision.js

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

// ---------------------------- objects.js
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

// ---------------------------- entities.js

const entities = [];

class Entity extends GameObject {
  constructor(position, size) {
    super(position);
    this.size = size;
    this.element = document.createElement("canvas");
    entities.push(this);
  }

  frameUpdate() {
    Vector3.transformElement(this.element, this.position);
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

// ---------------------------- player.js

class PlayerEntity extends LivingEntity {}

let currentPlayerEntity = null;

// ---------------------------- controls.js

const keysDown = new Set();

document.addEventListener("keydown", function (e) {
  if (e.repeat) {
    return;
  }
  if (e.key == "ArrowUp" && currentPlayerEntity) {
    currentPlayerEntity.linearVelocity = currentPlayerEntity.linearVelocity
      .mult(new Vector3(1, 0, 1))
      .add(new Vector3(0, 15, 0));
  }
  keysDown.add(e.key);
});

document.addEventListener("keyup", function (e) {
  keysDown.delete(e.key);
});

function controlUpdate() {
  let moveDirection = new Vector3();
  switch (true) {
    case keysDown.has("ArrowRight"):
      moveDirection = new Vector3(1, 0, 0);
      break;
    case keysDown.has("ArrowLeft"):
      moveDirection = new Vector3(-1, 0, 0);
      break;
  }
  if (currentPlayerEntity) {
    currentPlayerEntity.moveDirection = moveDirection;
  }
}

// ---------------------------- init.js

const body = document.body;
const root = document.documentElement;

const mario = new PlayerEntity(
  new Vector3(100, wHeight, 0),
  new Vector3(50, 50, 50),
  10,
  10,
);

function bunsCollisions() {
  colliders.forEach((collider) => {
    if (collider != mario.collision && collider.touching(mario)) {
      mario.position = mario.position.add(new Vector3(0, 1, 0));
      mario.linearVelocity = mario.linearVelocity.mult(new Vector3(1, 0, 1));
    }
  });
}

function InitGame() {
  Object.assign(body.style, {
    width: wWidth + "px",
    height: wHeight + "px",
    transformStyle: "preserve-3d",
    overflow: "visible",
  });

  const requiredVisibleStyles = [
    [
      "background",
      "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
    ],
    ["border", "0px none rgb(0, 0, 0)"],
    ["display", "none"],
    ["visibility", "hidden"],
  ];

  function isAVisibleElement(element) {
    const style = window.getComputedStyle(element);
    let valid = true;

    if (isStringBlank(GetTextOfElement(element))) {
      requiredVisibleStyles.every((styleData) => {
        if (style.getPropertyValue(styleData[0]) == styleData[1]) {
          valid = false;
          return false;
        }
      });
    }

    return valid;
  }

  document.querySelectorAll("div, a, p, h1").forEach((element) => {
    if (element.classList.contains("face-3d")) {
      return;
    }
    if (!isAVisibleElement(element)) {
      return;
    }
    const rect = element.getBoundingClientRect();
    const aspectRatio = rect.width / rect.height;
    //aspectRatio < 2 && aspectRatio > 0.5 &&
    if (rect.width > wWidth / 1.2 && (rect.height > 300 || rect.height < 2)) {
      return;
    }
    createBoxFromElement(element);
  });

  Object.assign(root.style, {
    overflow: "hidden",
    transformStyle: "preserve-3d",
    perspective: "800px",
  });

  document.body.appendChild(mario.element);
  mario.element.style =
    "all: unset; position: absolute; background: white; border: 1px solid black; width: 50px; height: 50px;";
  currentPlayerEntity = mario;
  window.requestAnimationFrame(MainUpdate);
}

// ---------------------------- main.js

function MainUpdate() {
  body.style.transform = `rotateY(${0}deg) translate(${-mario.position.x + window.innerWidth / 2}px, ${mario.position.y + window.innerHeight / 2}px)`;
  mario.frameUpdate();
  mario.linearVelocity = mario.linearVelocity.sub(new Vector3(0, 1, 0));
  bunsCollisions();
  controlUpdate();
  window.requestAnimationFrame(MainUpdate);
}

const startButton = document.createElement("button");
startButton.textContent = "Start";
startButton.style =
  "all: unset; position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); background: lime; padding: 10px; border: 5px solid white; outline: 1px solid black; box-shadow: 5px 5px 0 rgba(0,0,0,0.5); border-radius: 10px; cursor: pointer;";
document.body.appendChild(startButton);

startButton.addEventListener("click", (ev) => {
  startButton.remove();
  InitGame();
});

startButton.remove();
InitGame();