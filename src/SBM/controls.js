const keysDown = new Set();

document.addEventListener("keydown", function (e) {
  if (e.repeat) {
    return;
  }
  if (e.key == "z" && SBM.playerEntity) {
    SBM.playerEntity.linearVelocity = SBM.playerEntity.linearVelocity
      .mult(new Vector3(1, 0, 1))
      .add(new Vector3(0, 15, 0));
  }
  if (e.key == "x" && currentCamera) {
    currentCamera.view3D = !currentCamera.view3D;
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
  
  if (SBM.playerEntity) {
    SBM.playerEntity.moveDirection = moveDirection;
  }
}
