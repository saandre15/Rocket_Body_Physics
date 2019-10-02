export class Rocket {
  private position: Point;
  private yA: number;
  private mass: number;
  private yB: number;
  private sprite: HTMLImageElement;
  constructor(sprite: HTMLImageElement){
    this.sprite = sprite;
    this.position = new Point(0, 0);
  }
  setValues(yA: number, yB: number, mass: number) {
    this.yA = yA;
    this.yB = yB;
    this.mass = mass;
  }
  public getSprite() {
    return this.sprite;
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
  private ctx: CanvasRenderingContext2D;
  private rocket: Rocket;
  private star: HTMLImageElement;
  private starsPos: Point[];
  constructor(rocket: Rocket, star: HTMLImageElement) {
    this.aGravity = -9.8;
    this.fGravity = this.aGravity * rocket.getMass();
    this.canvas = document.getElementById('simulation') as HTMLCanvasElement;
    const w: number = this.canvas.clientWidth;
    const h: number = this.canvas.clientHeight;
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');
    this.rocket = rocket;
    this.star = star;
    this.starsPos = [];
  }
  init() {
    this.rocket.getSprite().addEventListener('load', () => {
      console.log("Rocket Sprite loaded");
      this.drawInitRocket();
    });
    this.star.addEventListener('load', () => {
      console.log("Star Sprite loaded");
      for(let i = 0 ; i < this.canvas.width; i++) {
        for(let e = 0; e < this.canvas.height; e++) {
           const rand: number = Math.round(Math.random() * 1000);
           if(rand === 355) {
            this.starsPos.push(new Point(i, e));
            this.ctx.drawImage(this.star, i, e, 10, 10);
           }
        }
      }
    });
  }
  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  redrawStars(): void {
    for(let i = 0; i < this.starsPos.length; i++) {
      const cur: Point = this.starsPos[i];
      this.ctx.drawImage(this.star, cur.getX(), cur.getY(), 10, 10);
    }
  }
  drawInitRocket(): void {
    let sprite = this.rocket.getSprite();
    const startPosX = (this.canvas.width / 10) * 4.5;
    const startPosY = (this.canvas.height / 10) * 7;
    this.ctx.drawImage(sprite, startPosX, startPosY, sprite.width, sprite.height);
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, startPosY + 18, this.canvas.width, this.canvas.height);
  }
  setRocketValues(yA: number, yB: number, mass: number) {
    this.rocket.setValues(yA, yB, mass);
    this.fGravity = this.aGravity * this.rocket.getMass();
  }
  start() {
    const startPosX = (this.canvas.width / 10) * 4.4;
    const startPosY = (this.canvas.height / 10) * 3;
    const redraw = () => {
      this.clearCanvas();
      this.redrawStars();
      this.drawInitRocket();
      this.ctx.fillStyle = "white";
      this.ctx.font = 'bold 60pt Arial';
    }
    setTimeout(() => {
      redraw();
      this.ctx.fillText("3", startPosX, startPosY);
    }, 1000);
    setTimeout(() => {
      redraw();
      this.ctx.fillText("2", startPosX, startPosY);
    }, 2000);
    setTimeout(() => {
      redraw();
      this.ctx.fillText("1", startPosX, startPosY);
    }, 3000);
    setTimeout(() => {
      redraw();
      this.ctx.fillText("START", startPosX - 100, startPosY);
      setTimeout(() => {redraw();  this.draw()}, 1000);
    }, 4000);
  }
  draw(): void {
    const inc: number = 0.1;
    let seconds: number = 0.0;
    let passInit: boolean = false;
    const interval = setInterval(() => {
      console.log(this.getYDisplacement(seconds));
      if(this.getYDisplacement(seconds) < 0) {
        console.log("Clear interval");
        clearInterval(interval);
      }
      seconds += inc;
      this.clearCanvas();
      this.redrawStars();
      this.drawInitRocket();
      this.redrawCalc(seconds);
      //this.redraw(seconds);
      this.getYDisplacement(seconds, true);
    }, inc);
    return;
  }
  redrawCalc(time: number) {
    const textPlacementX: number = (this.canvas.width / 30);
    const textPlacementY: number = (this.canvas.height / 10);
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Time[s]", textPlacementX, textPlacementY + 0);
    this.ctx.fillText(time.toFixed(4) + " s", textPlacementX, textPlacementY + 30);
    this.ctx.fillText("Position[Y]", textPlacementX, textPlacementY + 60);
    this.ctx.fillText(this.getYDisplacement(time) + "(m)", textPlacementX, textPlacementY + 90);
    this.ctx.fillText("Velocity[Y]", textPlacementX, textPlacementY + 120);
    this.ctx.fillText(this.getYVel(time) + "(m/s)", textPlacementX, textPlacementY + 150);
    this.ctx.fillText("Acceleration[Y]", textPlacementX, textPlacementY + 180);
    this.ctx.fillText(this.getYAccel(time) + "(m/s^2)", textPlacementX, textPlacementY + 210);
  }
  redraw(time: number) {
    const yVel = this.getYVel(time);
    this.rocket.setPos(new Point(this.rocket.getPos().getX(), this.rocket.getPos().getY() + yVel));
  }
  private getYDisplacement(time: number, autoinc?: boolean): number {
    const yDisplacement = this.rocket.getPos().getY() + this.getYVel(time);
    if(autoinc)
      this.rocket.setPos(new Point(this.rocket.getPos().getX(), yDisplacement));
    return yDisplacement;
  }
  private getYVel(time: number): number {
    const rForceY = this.rocket.getCurForceY(time);
    const tForceY = rForceY + this.fGravity;
    const yVel = (tForceY * time) / this.rocket.getMass();
    return yVel;
  }
  private getYAccel(time: number): number {
    const rForceY = this.rocket.getCurForceY(time);
    const tForceY = rForceY + this.fGravity;
    const yAccel = tForceY / this.rocket.getMass();
    return yAccel;
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