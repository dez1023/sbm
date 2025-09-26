const body = document.body;
const root = document.documentElement;

const mario = new PlayerEntity(
  new Vector3(100, wHeight, 0),
  new Vector3(50, 50, 50),
  10,
  10,
);

function InitGame() {
  Object.assign(body.style, {
    width: wWidth + "px",
    height: wHeight + "px",
    transformStyle: "preserve-3d",
    overflow: "visible",
  });

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
  playerEntity = mario;
}
