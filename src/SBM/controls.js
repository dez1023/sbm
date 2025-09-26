const keysDown = new Set();

document.addEventListener("keydown", function (e) {
  if (e.repeat) {
    return;
  }
  if (e.key == "z" && currentPlayerEntity) {
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
