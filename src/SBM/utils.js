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
}

function isStringBlank(str) {
  return str === null || str === undefined || str.trim().length === 0;
}
