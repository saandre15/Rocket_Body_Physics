class Object {
  protected sprite: HTMLImageElement;
  protected position: Point;
  protected yA: number;
  protected mass: number;
  protected yB: number;
  protected yForce: number;
  protected gravityForce: number;
  constructor(sprite: HTMLImageElement) {
    this.sprite = sprite;
    this.position = new Point(0,0);
    this.sprite.addEventListener('load', () => console.log("The object sprite has loaded."));
  }
  public setValues(yA: number, yB: number, mass: number) {
    this.yA = yA;
    this.yB = yB;
    this.mass = mass;
  }
  public getSprite() {
    return this.sprite;
  }
  public getCurForceY(time: number): number {
    return Math.sqrt(this.yA - (this.yB * time));
  }
  public getAccelY(time: number): number {
    return this.getCurForceY(time) / this.mass;
  }
  public getMass(): number {
    return this.mass;
  }
  public setPos(point: Point): void {
    this.position = point;
  }
  public getPos(): Point {
    return this.position;
  }
  public setYGravityForce(force: number): void {
    this.gravityForce = force;
  }
}

export class Planet {
  private gravityAccel: number;
  constructor(gravityAccel: number) {
    this.gravityAccel = gravityAccel;
  }
  public getObjGravForce(mass: number) {
    return this.gravityAccel * mass;
  }
}

export interface IStars {
  image: HTMLImageElement,
  positions: Point[];
}

export class Stars implements IStars {
  image: HTMLImageElement;
  positions: Point[]
  constructor(image: HTMLImageElement, positions: Point[]) {
    this.image = image;
    this.positions = positions;
  }
  public arrange(width: number, height: number): void {
    for(let i = 0 ; i < width; i++) {
      for(let e = 0; e < height; e++) {
         const rand: number = Math.round(Math.random() * 1000);
         if(rand === 355) {
          this.positions.push(new Point(i, e));
         }
      }
    }
  }
}

export class Simulation {
  private earth: Planet;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private objs: Object[];
  private stars: Stars;
  constructor(objs: Object[]) {
    this.earth = new Planet(-9.8);
    this.objs = objs;
    for(let i = 0 ; i < this.objs.length; i++) {
      const cur: Object = this.objs[i];
      cur.setYGravityForce(this.earth.getObjGravForce(cur.getMass()));
    }
    this.canvas = document.getElementById('simulation') as HTMLCanvasElement;
    const w: number = this.canvas.clientWidth;
    const h: number = this.canvas.clientHeight;
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');
    this.stars.image = new Image(10, 10);
    this.stars.image.src = "https://clipart.info/images/ccovers/1531014986Gold-Star-Transparent-PNG-Clip-Art.png";
    this.stars.positions = [];
    this.stars.arrange(this.canvas.width, this.canvas.height);
  }
  public init() {
    this.drawStars();
    this.drawLandscape();
    this.drawPosition(0);
  }
  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  private drawStars(): void {
    for(let i = 0; i < this.stars.positions.length; i++) {
      const cur: Point = this.stars.positions[i];
      this.ctx.drawImage(this.stars.image, cur.getX(), cur.getY(), 10, 10);
    }
  }
  private drawPosition(): void {
    const startPosX = (this.canvas.width / 10) * 4.5;
    const startPosY = (this.canvas.height / 10) * 7;
    for(let i = 0 ; i < this.objs.length; i++) {
      const cur: Object = this.objs[i];
      const yPos: Point = cur.getPos();
      this.ctx.drawImage(cur.getSprite(), startPosX, startPosY, cur.getSprite().width, cur.getSprite().height);
    }
  }
  private drawLandscape() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, startPosY + 18, this.canvas.width, this.canvas.height);
  }
  setRocketValues(yA: number, yB: number, mass: number) {
    this.rocket.setValues(yA, yB, mass);
    this.fGravity = this.aGravity * this.rocket.getMass();
  }
  public start() {
    const startPosX = (this.canvas.width / 10) * 4.4;
    const startPosY = (this.canvas.height / 10) * 3;
    const redraw = () => {
      this.clearCanvas();
      this.drawStars();
      this.drawPosition();
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
  private draw(): void {
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
      this.drawStars();
      this.drawObjs(seconds);
      this.redrawCalc(this.objs[0], seconds);
      this.getYDisplacement(seconds, true);
    }, inc);
    return;
  }
  redrawCalc(obj: Object, time: number) {
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