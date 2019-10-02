class Config {
  protected config: Chart.ChartConfiguration;
  protected chart: Chart;
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this.config = {
      type: "line"
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }
  public setData(points: Chart.Point[]) {
    this.config.data.datasets[0].data = points;
    this.config.data.datasets[0].label = "Time(s)";
  }
}

class Position extends Config {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.chart = new Chart(this.ctx, this.config);
    this.chart.options.title = {
      display: true,
      text: "Postion[Y] vs Time Graph"
    }
  }
}

class Velocity extends Config {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.chart = new Chart(this.ctx, this.config);
    this.chart.options.title = {
      display: true,
      text: "Velocity[Y] vs Time Graph"
    }
  }
}

class Acceleration extends Config {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.chart = new Chart(this.ctx, this.config);
    this.chart.options.title = {
      display: true,
      text: "Acceleration[Y] vs Time Graph"
    }
  }
}


