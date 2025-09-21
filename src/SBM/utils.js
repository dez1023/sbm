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