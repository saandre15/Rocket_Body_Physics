class Object {
  protected sprite: HTMLImageElement;
  protected position: Point;
  protected mass: number;
  protected yForce: number;
  protected ready: boolean;
  protected time: number;
  constructor(sprite: HTMLImageElement, x: number, y: number) {
    this.time = 0;
    this.ready = false;
    this.sprite = sprite;
    this.position = new Point(x, y);
    this.sprite.addEventListener('load', () => this.ready = true);
  }
  public getSprite() {
    return this.sprite;
  }
  public getCurForceY(): number {
    return -1;
  }
  public getAccelY(): number {
    return this.getCurForceY() / this.mass;
  }
  public getVeloY(): number {
    return (this.getCurForceY() * this.time) / this.mass;
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
  public setTime(seconds: number) {
    this.time = seconds;
  }
}

export class Rocket extends Object {
  protected yA: number;
  protected yB: number;
  private parachute: HTMLImageElement;
  private parachuteMode: boolean;
  private parchuteC: number;
  constructor(x: number, y:number) {
    const sprite = new Image(30, 30);
    sprite.src = "https://drive.google.com/uc?export=view&id=1p5huN9IbFfPHRtKVC6E_Q4cgJN336ADt";
    super(sprite, x, y);
    const parachute = new Image(40, 40);
    parachute.src = "https://drive.google.com/uc?export=view&id=1gwtaDwG3_D_1OJmImbBtUUtUlrlNKtRl";
    this.parachute = parachute;
    this.parachuteMode = false;
  }
  public getCurForceY(): number {
    if(!this.yA || !this.yB || !this.mass)
      alert("Please set the A, B, and Mass.");
    const force: number = Math.sqrt(this.yA - (this.yB * this.time));
    if(isNaN(force))
      return 0;
    else
      return force;
  }
  public setValues(yA: number, yB: number, mass: number) {
    this.yA = yA;
    this.yB = yB;
    this.mass = mass;
  }
  public setParachuteDragForce(c: number): void {
    this.parchuteC = c;
  }
  public getParachuteC(): number {
    return this.parchuteC;
  }
  public activateParachute() {
    this.parachuteMode = true;
  }
  public getParachute(): HTMLImageElement {
    return this.parachute;
  }
  public hasParachute(): boolean {
    return this.parachuteMode;
  }
}

export class Planet {
  private gAccel: number;
  private airResC: number;
  private enableParachute: boolean;
  private enableAirResistance: boolean;
  private objs: Object[];
  private time: number;
  private velocities: number[];
  private accelerations: number[];
  constructor(objs: Object[]) {
    this.objs = objs;
    this.enableAirResistance = false;
    this.enableParachute = false;
    this.time = 0;
    this.gAccel = 0;
    this.airResC = 0;
    this.velocities = new Array<number>(this.objs.length);
    this.accelerations = new Array<number>(this.objs.length);
    for(let i = 0 ; i < this.objs.length; i++) {
      this.velocities[i] = 0;
      this.accelerations[i] = 0;
    }
  }
  public toggleParachute(): void {
    this.enableParachute = !this.enableParachute;
  }
  public toggleAirRes(): void {
    this.enableAirResistance = !this.enableAirResistance;
  }
  public hasAirRes(): boolean {
    return this.enableAirResistance;
  }
  public hasParachute(): boolean {
    return this.enableParachute;
  }
  public setGAccel(accel: number): void {
    this.gAccel = accel;
  }
  public setAirResC(c: number): void {
    this.airResC = c;
  }
  public getAirRes(time: number): number {
    return this.airResC;
  }
  public getObjs(): Object[] {
    return this.objs;
  }
  public setTime(seconds: number): void {
    for (let i = 0; i < this.objs.length; i++) {
      const cur: Object = this.objs[i];
      const pos: Point = cur.getPos();
      // Increment time
      this.velocities[i] = this.getObjNetVelY(i, seconds, this.time, this.accelerations[i], this.velocities[i]);
      this.accelerations[i] = this.getObjNetAccelY(i);
      if(this.getNetVelocity(i) < 0 && cur instanceof Rocket)
        cur.activateParachute()
      const displaceY: number = pos.getY() + this.getNetVelocity(i);
      cur.setPos(new Point(pos.getX(), displaceY));
      this.time = seconds;
    }
  }
  public getTime(): number {
    return this.time;
  }
  public getObjNetForceY(index: number): number {
    const obj: Object = this.objs[index];
    const oForce: number = obj.getCurForceY();
    const gForce: number = obj.getMass() * this.gAccel;
    let dForce: number = 0;
    let aForce: number = 0;
    if(this.getObjs()[index] instanceof Rocket) {
      const rocket: Rocket = this.getObjs()[index] as Rocket;
      if(rocket.hasParachute() && this.enableParachute)
        dForce = -1 * rocket.getParachuteC() * Math.pow(this.getNetVelocity(index), 2);
    }
    if(this.enableAirResistance)
      aForce = this.airResC ? -this.airResC * this.getNetVelocity(index) : 0;
    return oForce + gForce + aForce + dForce;
  }
  public getObjNetAccelY(index: number): number {
    const obj: Object = this.objs[index];
    const nForce: number = this.getObjNetForceY(index);
    const accelY: number = nForce / obj.getMass();
    return accelY;
  }
  // this wont work because it taking the net force at this time and mutiplying with all time
  // return (nForce * this.time) / obj.getMass();
  public getObjNetVelY(index: number, time: number, prevTime: number, prevAccel: number, prevVel: number): number {
    // take the time inc * ( ( accel of now + accel of next inc )  / 2)
    this.objs[index].setTime(time);
    const cur: number = ( time - prevTime ) * ((this.getObjNetAccelY(index) + prevAccel) / 2) + prevVel;
    return cur;
  }
  public getNetVelocity(index: number): number {
    return this.velocities[index];
  }
  public getNetAcceleration(index: number): number {
    return this.accelerations[index];
  }
  public getNetDistance(index: number): number {
    return this.getObjs()[index].getPos().getY();
  }
}


export class Stars {
  private ready: boolean;
  private image: HTMLImageElement;
  private positions: Point[];
  constructor() {
    this.ready = false;
    this.positions = [];
    this.image = new Image(10, 10);
    this.image.src = "https://drive.google.com/uc?export=view&id=1ACupvOABzxwP1AL8EvL-iyFokYMPHNIN";
    this.image.addEventListener('load' , () => this.ready = true);
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
  public getPositions(): Point[] {
    return this.positions;
  }
  public getImage(): HTMLImageElement {
    return this.image;
  }
}

export class Simulation {
  private earth: Planet;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Stars;
  constructor(objs: Object[]) {
    this.earth = new Planet(objs);
    this.earth.setGAccel(-9.8);
    this.canvas = document.getElementById('simulation') as HTMLCanvasElement;
    const w: number = this.canvas.clientWidth;
    const h: number = this.canvas.clientHeight;
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');
    this.stars = new Stars();
    this.stars.arrange(this.canvas.width, this.canvas.height);
  }
  public toggleParachute(): void {
    this.earth.toggleParachute();
  }
  public toggleAirResistance(): void {
    this.earth.toggleAirRes();
  }
  public setAirResistance(c: number) {
    this.earth.setAirResC(c);
  }
  public getEarth(): Planet {
    return this.earth;
  }
  public resetCanvas() : void {
    this.canvas = document.getElementById('simulation') as HTMLCanvasElement;
    const w: number = this.canvas.clientWidth;
    const h: number = this.canvas.clientHeight;
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');
  }
  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  private drawStars(): void {
    const positions: Point[] = this.stars.getPositions();
    for(let i = 0; i < positions.length; i++) {
      const cur: Point = positions[i];
      this.ctx.drawImage(this.stars.getImage(), cur.getX(), cur.getY(), 10, 10);
    }
  }
  private drawPosition(): void {
    const startPosX = (this.canvas.width / 10) * 4.5;
    const startPosY = (this.canvas.height / 10) * 7;
    const scale: number = 1000;
    for(let i = 0 ; i < this.earth.getObjs().length; i++) {
      const cur: Object = this.earth.getObjs()[i];
      const position: Point = cur.getPos();
      this.ctx.drawImage(cur.getSprite(), startPosX, startPosY - (position.getY() / scale), cur.getSprite().width, cur.getSprite().height);
      if(cur instanceof Rocket) {
        const parachute: HTMLImageElement = cur.getParachute();
        if(cur.hasParachute() && this.earth.hasParachute())
          this.ctx.drawImage(parachute, startPosX - 5, startPosY - ((position.getY() / scale)) - 30 , parachute.width, parachute.height);
      }
    }
  }
  private drawLandscape() {
    const startPosX = (this.canvas.width / 10) * 4.5;
    const startPosY = (this.canvas.height / 10) * 7;
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, startPosY + 18, this.canvas.width, this.canvas.height);
  }
  private drawCalc(obj: number) {
    const textPlacementX: number = (this.canvas.width / 30);
    const textPlacementY: number = (this.canvas.height / 10);
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Time[s]", textPlacementX, textPlacementY + 0);
    this.ctx.fillText(this.earth.getTime().toFixed(4) + " s", textPlacementX, textPlacementY + 30);
    this.ctx.fillText("Position[Y]", textPlacementX, textPlacementY + 60);
    this.ctx.fillText(this.earth.getObjs()[0].getPos().getY() + " (m)", textPlacementX, textPlacementY + 90);
    this.ctx.fillText("Velocity[Y]", textPlacementX, textPlacementY + 120);
    this.ctx.fillText(this.earth.getNetVelocity(obj) + "(m/s)", textPlacementX, textPlacementY + 150);
    this.ctx.fillText("Acceleration[Y]", textPlacementX, textPlacementY + 180);
    this.ctx.fillText(this.earth.getNetAcceleration(obj) + "(m/s^2)", textPlacementX, textPlacementY + 210);
  }
  public drawToggle() {
    this.clearCanvas();
    this.drawStars();
    this.drawPosition();
    this.drawLandscape();
    const textPlacementX: number = (this.canvas.width / 30) * 29;
    const textPlacementY: number = (this.canvas.height / 10);
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = 'right';
    this.ctx.fillText(this.earth.hasAirRes() ? "Air Resistance ON" : "Air Resistance OFF", textPlacementX, textPlacementY + 0);
    this.ctx.fillText(this.earth.hasParachute() ? "Parachute ON" : "Parachute OFF", textPlacementX, textPlacementY + 30);
  }
  private draw(): void {
    const inc: number = 0.1;
    let seconds: number = 0.0;
    let prevDist: number = 0;
    const interval = setInterval(() => {
      //if(this.getYDisplacement(seconds) < 0) {
      //  console.log("Clear interval");
      //  clearInterval(interval);
      //}
      seconds += inc;
      this.clearCanvas();
      this.drawStars();
      this.drawPosition();
      this.drawLandscape();
      this.drawCalc(0);
      const displace: number = this.earth.getObjs()[0].getPos().getY();
      if(displace < 0) {
        this.earth.getObjs()[0].getPos().setY(0);
        this.clearCanvas();
        this.drawStars();
        this.drawPosition();
        this.drawLandscape();
        this.drawCalc(0);
        alert("Simulation is complete the rocket is back on the surface. If your rocket didn't move there isn't enough force to propel it up.");
        clearInterval(interval);
      }
      prevDist = displace;
      this.earth.setTime(seconds);
    }, inc);
    return;
  }
  public init() {
    this.drawStars();
    this.drawPosition();
    this.drawLandscape();
    this.drawToggle();
  }
  public start() {
    const startPosX = (this.canvas.width / 10) * 4.6;
    const startPosY = (this.canvas.height / 10) * 3;
    const redraw = () => {
      this.clearCanvas();
      this.drawStars();
      this.drawPosition();
      this.drawLandscape();
      this.ctx.fillStyle = "white";
      this.ctx.font = 'bold 60pt Arial';
      this.ctx.textAlign = 'center';
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
      this.ctx.fillText("START", startPosX, startPosY);
      setTimeout(() => {redraw();  this.draw()}, 1000);
    }, 4000);
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