class Camera extends GameObject {
  fov = 70;
  mode = 2;
  _view3D = true;
  subjects = [];

  constructor(position, rotation) {
    super(position);
    this.rotation = rotation ?? new Vector3();
    this.view3D = this._view3D;
  }

  get view3D() {
    return this._view3D;
  }

  set view3D(newValue) {
    this._view3D = newValue;
    root.style.setProperty("--face-display", newValue ? "inline" : "none");
    this.fov = newValue ? 70 : 0;
    this.rotation = new Vector3(0, newValue ? 80 : 0);
  }

  frameUpdate() {
    if (this.subjects.length > 0) {
      switch (this.mode) {
        case 2:
        this.position = this.subjects[0].position;
        break;
      }
    }
    root.style.perspective = 7800 - this.fov * 100 + "px";
    body.style.transform = `rotateY(${this.rotation.y}deg) translate(${-this.position.x + window.innerWidth/2}px, ${this.position.y + window.innerHeight/2}px)`;
  }
}
