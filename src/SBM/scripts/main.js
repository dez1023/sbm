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
startButton.className = "SPMui outlineShadow";
startButton.id = "startButton";
body.appendChild(startButton);

startButton.addEventListener("click", (ev) => {
  startButton.remove();
  window.scrollTo(0, 0);
  InitGame();
  window.requestAnimationFrame(MainUpdate);
});
