class Camera extends GameObject {
  fov = 70;
  mode = 1;
  _view3D = false;
  subjects = [];

  constructor(position, rotation) {
    super(position);
    this.rotation = rotation ?? new Vector3();
    this.view3D = false;
  }

  get view3D() {
    return _view3D;
  }

  set view3D(newValue) {
    this._view3D = newValue;
    root.style.setProperty("--face-display", newValue ? "inline" : "hidden");
  }

  frameUpdate() {
    if (this.subjects.length > 0) {
      switch (this.mode) {
        case 2:
          this.position = this.subjects[0].position;
          break;
      }
    }
    body.style.perspective = 7800 - this.fov * 100 + "px";
    body.style.transform = `rotateY(${this.rotation.y}deg) translate(${-this.position.x + window.innerWidth/2}px, ${this.position.y + window.innerHeight/2}px)`;
  }
}
