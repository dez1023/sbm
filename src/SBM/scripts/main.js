SBM.currentCamera = new Camera(new Vector3(), new Vector3());
SBM.currentCamera.subjects.push(mario);
SBM.currentCamera.view3D = false;
mario.rotateWithCamera = true;

function MainUpdate() {
  SBM.currentCamera.frameUpdate();
  SBM.playerEntity.frameUpdate();
  SBM.playerEntity.linearVelocity = SBM.playerEntity.linearVelocity.sub(
    new Vector3(0, 1),
  );
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
  window.scrollTo(0, 0);
  window.requestAnimationFrame(MainUpdate);
});
