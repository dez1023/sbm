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