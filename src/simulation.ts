/**
 * @classdesc This is the base class for every object on a planet
 */
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
  /**
   * @description getSprite Read access to the sprite
   */
  public getSprite() {
    return this.sprite;
  }
  /**
   * @description getCurForceY Default current force of all object
   */
  public getCurForceY(): number {
    return -1;
  }
  /**
   * @description getAccelY Derives the acceleration from the current force
   */
  public getAccelY(): number {
    return this.getCurForceY() / this.mass;
  }
  /**
   * @description getVeloY Drives the velocity from the current force
   */
  public getVeloY(): number {
    return (this.getCurForceY() * this.time) / this.mass;
  }
  /**
   * @description getMass Read access to the mass
   */
  public getMass(): number {
    return this.mass;
  }
  /**
   * 
   * @param point Sets the Position based of the point at a point in time
   */
  public setPos(point: Point): void {
    this.position = point;
  }
  /**
   * @description getPos read access to to the position at a point in time
   */
  public getPos(): Point {
    return this.position;
  }
  /**
   * 
   * @param seconds Time
   * @description setTime sets the time
   */
  public setTime(seconds: number) {
    this.time = seconds;
  }
}
/**
 * @classdesc A Rocket Object
 */
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
  /**
   * @override
   */
  public getCurForceY(): number {
    if(!this.yA || !this.yB || !this.mass)
      alert("Please set the A, B, and Mass.");
      /**
       * @formula This is the force curve equation for the rocket
       */
    const force: number = Math.sqrt(this.yA - (this.yB * this.time));
    if(isNaN(force))
      return 0;
    else
      return force;
  }
  /**
   * 
   * @param yA A
   * @param yB B
   * @param mass MASS
   * @description setValues setter for the equations 
   */
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
/**
 * @classdesc This is the planet in which all objects in the simulation will be attrached to.
 */
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
  /**
   * @description toggleParachute Toggle if the planet forces the object to have parachute
   */
  public toggleParachute(): void {
    this.enableParachute = !this.enableParachute;
  }
  /**
   * @description toggleAirRes Toggle if the planet has air resistance
   */
  public toggleAirRes(): void {
    this.enableAirResistance = !this.enableAirResistance;
  }
  /**
   * @description hasAirRes read access to see if planet has air resistance
   */
  public hasAirRes(): boolean {
    return this.enableAirResistance;
  }
  /**
   * @description hasParachute read access to see if the planet has the object deploy parachute
   */
  public hasParachute(): boolean {
    return this.enableParachute;
  }
  /**
   * 
   * @param accel The acceleration the planet gravity
   * @description setGAccel Setter for the planet gravity acceleration
   */
  public setGAccel(accel: number): void {
    this.gAccel = accel;
  }
  /**
   * @param c The c variable for the formula of the force trust equation
   * @description setAirResC Setter for the force trust equation C var
   */
  public setAirResC(c: number): void {
    this.airResC = c;
  }
  /**
   * 
   * @param time The time in seconds
   * @description getAirRes Read access to the Air Resistance C in the force trust equation
   */
  public getAirRes(time: number): number {
    return this.airResC;
  }
  /**
   * @description getObjs Get all objects within the planet attractional force
   */
  public getObjs(): Object[] {
    return this.objs;
  }
  /**
   * 
   * @param seconds The time in terms of seconds
   * @description setTime Set the time and calculate the velocity and acceleration at that time
   */
  public setTime(seconds: number): void {
    for (let i = 0; i < this.objs.length; i++) {
      const cur: Object = this.objs[i];
      const pos: Point = cur.getPos();
      // Increment time
      this.velocities[i] = this.getObjNetVelY(i, seconds, this.time, this.accelerations[i], this.velocities[i]);
      this.accelerations[i] = this.getObjNetAccelY(i);
      if(this.getNetVelocity(i) < 0 && cur instanceof Rocket)
      //if(cur instanceof Rocket)
        cur.activateParachute();
      const displaceY: number = pos.getY() + this.getNetVelocity(i);
      cur.setPos(new Point(pos.getX(), displaceY));
      this.time = seconds;
    }
  }
  /**
   * @description getTime Read access to the time at the moment of being called
   */
  public getTime(): number {
    return this.time;
  }
  /**
   * 
   * @param index The object index within the Object array
   * @description getObjNetForceY 
   */
  public getObjNetForceY(index: number): number {
    const obj: Object = this.objs[index];
    /**
     * @var oForce The Objects Force Product from within the object
     * @var gForce The Gravity Force from the planet 
     * @var dForce The Drag Force of the parachute
     * @var aForce The Air Resistance force from the the planet atmosphere
     */
    const oForce: number = obj.getCurForceY();
    const gForce: number = obj.getMass() * this.gAccel;
    let dForce: number = 0;
    let aForce: number = 0;
    if(this.getObjs()[index] instanceof Rocket) {
      const rocket: Rocket = this.getObjs()[index] as Rocket;
      if(rocket.hasParachute() && this.enableParachute) {
        /**
         * @formula Drag Force = cv^2
         */
        dForce =  rocket.getParachuteC() * (this.getNetVelocity(index) * this.getNetVelocity(index));
      }
    }
    if(this.enableAirResistance)
    /**
     * @formula Air Resistance Force = bv
     */
      aForce = this.airResC ? -this.airResC * this.getNetVelocity(index) : 0;
    return oForce + gForce + aForce + dForce;
  }
  /**
   * 
   * @param index The index within the object array
   * @description getObjNetAccelY Read access to the object acceleration
   */
  public getObjNetAccelY(index: number): number {
    const obj: Object = this.objs[index];
    const nForce: number = this.getObjNetForceY(index);
    const accelY: number = nForce / obj.getMass();
    return accelY;
  }
  /**
   * 
   * @param index The object index within the objects array
   * @param time The time within seconds
   * @param prevTime The previous time when this function was called
   * @param prevAccel The previous acceleration when this function was called
   * @param prevVel The previous velocity when this function was called
   * @description getObjNetVelY Write access to derive the velocity.
   */
  public getObjNetVelY(
    index: number, 
    time: number, 
    prevTime: number, 
    prevAccel: number, 
    prevVel: number): number {
    this.objs[index].setTime(time);
    /**
     * @description Uses derivates to calculate the velocity from the time and acceleration 
     * plus the previous velocity
     */
    const cur: number = ( time - prevTime ) * ((this.getObjNetAccelY(index) + prevAccel) / 2) + prevVel;
    return cur;
  }
  /**
   * 
   * @param index The object index within the object arrays
   * @description getNetVelocity Read access to the net velocity of an object
   */
  public getNetVelocity(index: number): number {
    return this.velocities[index];
  }
  /**
   * 
   * @param index The object index within the object arrays
   * @description getNetAcceleration Read access to the net acceleration of an object
   */
  public getNetAcceleration(index: number): number {
    return this.accelerations[index];
  }
  /**
   * 
   * @param index The object index within the object arrays
   * @description  Read access to the net velocity of an object
   */
  public getNetDistance(index: number): number {
    return this.getObjs()[index].getPos().getY();
  }
}

/**
 * @classdesc Drawing Logic for the stars
 */
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
  /**
   * 
   * @param width The width of the canvas
   * @param height The height of the canvas
   */
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
  /**
   * @description Access to the positions
   */
  public getPositions(): Point[] {
    return this.positions;
  }
  /**
   * @description Access to Sprite in the form of an HTMLImageElement
   */
  public getImage(): HTMLImageElement {
    return this.image;
  }
}

/**
 * @classdesc Creates the simulation where it will run experiments on the planet 
 */
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
  /**
   * @description Access to earth parachute toggle
   */
  public toggleParachute(): void {
    this.earth.toggleParachute();
  }
  /**
   * @description Access to earth air resistance toggle
   */
  public toggleAirResistance(): void {
    this.earth.toggleAirRes();
  }
  /**
   * 
   * @param c Earth air resistance C
   * @description Setter for Air resistance C on Earth
   */
  public setAirResistance(c: number) {
    this.earth.setAirResC(c);
  }
  /**
   * @description return the planet object
   */
  public getEarth(): Planet {
    return this.earth;
  }
  /**
   * @description Restart The Canvas
   */
  public resetCanvas() : void {
    this.canvas = document.getElementById('simulation') as HTMLCanvasElement;
    const w: number = this.canvas.clientWidth;
    const h: number = this.canvas.clientHeight;
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');
  }
  /**
   * @description Clear the Canvas
   */
  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  /**
   * @description Draw the stars
   */
  private drawStars(): void {
    const positions: Point[] = this.stars.getPositions();
    for(let i = 0; i < positions.length; i++) {
      const cur: Point = positions[i];
      this.ctx.drawImage(this.stars.getImage(), cur.getX(), cur.getY(), 10, 10);
    }
  }
  /**
   * Draws the objects positions
   */
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
  /**
   * @description Draws the Landscape
   */
  private drawLandscape() {
    const startPosX = (this.canvas.width / 10) * 4.5;
    const startPosY = (this.canvas.height / 10) * 7;
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, startPosY + 18, this.canvas.width, this.canvas.height);
  }
  /**
   * @description Draw the calculations on the side of the canvas
   * @param obj The index within the object array
   */
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
  /**
   * @description Draws Air Resistance and Parachute Toggled State
   */
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
  /**
   * @description The actual drawing function
   */
  private draw(): void {
    const inc: number = 0.1;
    let seconds: number = 0.0;
    let prevDist: number = 0;
    /**
     * @description The ASYNC while loop
     */
    const interval = setInterval(() => {
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
  /**
   * @description Initializes the class after DOM loads
   */
  public init() {
    this.drawStars();
    this.drawPosition();
    this.drawLandscape();
    this.drawToggle();
  }
  /**
   * @description Starts the simulation
   */
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
/**
 * @classdesc The X-Y coordinate
 */
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