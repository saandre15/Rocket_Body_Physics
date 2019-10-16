import { Simulation, Planet } from "./simulation";
import * as Chart from "chart.js";
import { LinkedList, Node } from "./LinkedList";

export class Graph {
  private simulation: Simulation;
  private config: Config;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private positionsY: number[];
  private velocitiesY: number[];
  private accelereationY: number[];
  private time: number[];
  constructor(simulation: Simulation) {
    this.simulation = simulation;
    this.positionsY = [];
    this.velocitiesY = [];
    this.accelereationY = [];
    this.time = [];
  }
  public init(): void {
    this.canvas = document.getElementById('graphCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    const w: number = this.canvas.clientWidth;
    const h: number = this.canvas.clientHeight;
    this.canvas.width = w;
    this.canvas.height = h;
    this.drawPosition();
  }
  public change(mode: "position" | "velocity" | "acceleration") {
    if(mode === "position")
      this.drawPosition;
    else if (mode === "velocity")
      this.drawVelocity;
    else if(mode === "acceleration")
      this.drawAcceleration;
  }
  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  public setCalc(): void {
    const earth: Planet = this.simulation.getEarth();
    let go: boolean = true;
    let inc: number = 0.1;
    let total: number = 0;
    const yPosList = new LinkedList<number>();
    const yVelList = new LinkedList<number>();
    const yAccelList = new LinkedList<number>();
    const timeList = new LinkedList<number>();
    if(this.simulation.getEarth().hasParachute())
      alert("Parachute graph will not have an animation as reallocating arrays and redrawing will be to slow!")
    const interval = setInterval(() => {
      const displacement: number = earth.getObjs()[0].getPos().getY();
      if(displacement < 0) {
        clearInterval(interval);
        const pos_toggle = document.getElementById('position_toggle') as HTMLButtonElement;
        const vel_toggle = document.getElementById('velocity_toggle') as HTMLButtonElement;
        const accel_toggle = document.getElementById('acceleration_toggle') as HTMLButtonElement;
        pos_toggle.disabled = false;
        vel_toggle.disabled = false;
        accel_toggle.disabled = false;
        if(this.simulation.getEarth().hasParachute()) {
          this.positionsY = yPosList.toDataArray();
          this.velocitiesY = yVelList.toDataArray();
          this.accelereationY = yAccelList.toDataArray();
          this.time = timeList.toDataArray();
        }
        return;
      }
      if(this.simulation.getEarth().hasParachute()) {
        yPosList.add(new Node(displacement));
        yVelList.add(new Node(earth.getNetVelocity(0)));
        yAccelList.add(new Node(earth.getNetAcceleration(0)));
        timeList.add(new Node(parseFloat(total.toFixed(2))));
      }
      else {
        this.positionsY.push(displacement);
        this.velocitiesY.push(earth.getNetVelocity(0));
        this.accelereationY.push(earth.getNetAcceleration(0));
        this.time.push(parseFloat(total.toFixed(2)));
        this.drawPosition();
      }
      earth.setTime(total + inc);
      total += inc;
    }, 0.00000001);
  }
  public drawPosition(): void {
    const pos: Position = new Position(this.ctx);
    pos.setData(this.positionsY, this.time, "Position");
    pos.draw();
  }
  public drawVelocity(): void {
    const vel: Velocity = new Velocity(this.ctx);
    vel.setData(this.velocitiesY, this.time, "Velocity");
    vel.draw();
  }
  public drawAcceleration(): void {
    const accel: Acceleration = new Acceleration(this.ctx);
    accel.setData(this.accelereationY, this.time, "Acceleration");
    accel.draw();
  }
}

class Config {
  protected config: Chart.ChartConfiguration;
  protected chart: Chart;
  constructor() {
    this.config = {
      type: "line"
    }
  }
  public setData(points: number[], times: number[], name: string): void {
    this.config.data.labels = times.map(cur => cur.toString());
    this.config.data.datasets.push({
      data: points,
      label: name,
    })
  }
  public draw(): void {
    this.chart.update({duration: 5, lazy: false, easing: 'easeInElastic'});
  }
}

class Position extends Config {
  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this.chart = new Chart(ctx, this.config);
    this.chart.options.title = {
      display: true,
      text: "Postion[Y] vs Time[S] Graph"
    }
  }
}

class Velocity extends Config {
  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this.chart = new Chart(ctx, this.config);
    this.chart.options.title = {
      display: true,
      text: "Velocity[Y] vs Time[S] Graph"
    }
  }
}

class Acceleration extends Config {
  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this.chart = new Chart(ctx, this.config);
    this.chart.options.title = {
      display: true,
      text: "Acceleration[Y] vs Time[S] Graph"
    }
  }
}


