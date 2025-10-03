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
    this.rotation = new Vector3(0, newValue ? 90 : 0);
  }

  frameUpdate() {
    if (this.subjects.length > 0) {
      switch (this.mode) {
        case 2:
          this.rotation.x = this.view3D ? -15 : 0;
          this.position = this.subjects[0].position;
        break;
      }
    }
    root.style.perspective = 70800 - this.fov * 1000 + "px";
    body.style.transform = `rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg) translate3d(${-this.position.x + window.innerWidth/2}px, ${this.position.y + window.innerHeight/2}px, ${-this.position.z}px)`;
}
