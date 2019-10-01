export class Rocket {
  private position: Point;
  private yA: number;
  private mass: number;
  private yB: number;
  constructor(sprite: HTMLImageElement, yA: number, yB: number, mass: number){
    this.position = new Point(0, 0);
    this.yA = yA;
    this.mass = mass;
    this.yB = yB;
  }
  getCurForceY(time: number): number {
    return Math.sqrt(this.yA - (this.yB * time));
  }
  getAccelY(time: number): number {
    return this.getCurForceY(time) / this.mass;
  }
  getMass(): number {
    return this.mass;
  }
  setPos(point: Point): void {
    this.position = point;
  }
  getPos(): Point {
    return this.position;
  }
}

export class Simulation {
  private aGravity: number;
  private fGravity: number;
  private canvas: HTMLCanvasElement;
  private rocket: Rocket;
  constructor(rocket: Rocket) {
    this.aGravity = -9.8;
    this.fGravity = this.aGravity * rocket.getMass();
    this.canvas = document.getElementById('simulation') as HTMLCanvasElement;
    this.rocket = rocket;
  }
  draw() {
    const inc: number = 0.001;
    let stop: boolean = false;
    while(!stop) {
      let seconds: number = 0.0;
      setInterval(() => {
        this.redraw(seconds);
        seconds += 0.001;
        document.getElementById('acceleration');
      }, 0.001);
    }
  }
  redraw(time: number) {
    const rForceY = this.rocket.getCurForceY(time);
    const tForceY = rForceY - this.fGravity;
    const yVel = (tForceY * time) / this.rocket.getMass();
    this.rocket.setPos(new Point(this.rocket.getPos().getX(), this.rocket.getPos().getY() + yVel));
  }
}

export class Point {
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  getX(): number {
    return this.x;
  }
  getY(): number {
    return this.y;
  }
  setX(x: number): void {
    this.x = x;
  }
  setY(y: number): void {
    this.y = y;
  }
  setXY(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}