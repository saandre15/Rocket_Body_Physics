var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Chart } from "chart.js";
var Graph = /** @class */ (function () {
    function Graph(simulation) {
        this.simulation = simulation;
        this.positionsY = [];
        this.velocitiesY = [];
        this.accelereationY = [];
    }
    Graph.prototype.init = function () {
        this.canvas = document.getElementById('graphCanvas');
        this.ctx = this.canvas.getContext('2d');
        var w = this.canvas.clientWidth;
        var h = this.canvas.clientHeight;
        this.canvas.width = w;
        this.canvas.height = h;
    };
    Graph.prototype.change = function (mode) {
        if (mode === "position")
            this.drawPosition;
        else if (mode === "velocity")
            this.drawVelocity;
        else if (mode === "acceleration")
            this.drawAcceleration;
    };
    Graph.prototype.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Graph.prototype.setCalc = function () {
        var earth = this.simulation.getEarth();
        var go;
        var inc = 0.1;
        var total = 0;
        while (go) {
            earth.setTime(total + inc);
            this.positionsY.push(earth.getNetDistance(0));
            this.velocitiesY.push(earth.getNetVelocity(0));
            this.accelereationY.push(earth.getNetAcceleration(0));
            total += inc;
        }
    };
    Graph.prototype.drawPosition = function () {
        this.clearCanvas();
        var pos = new Position(this.ctx);
        pos.setData(this.positionsY);
        pos.draw();
    };
    Graph.prototype.drawVelocity = function () {
        this.clearCanvas();
        var vel = new Velocity(this.ctx);
        vel.setData(this.velocitiesY);
        vel.draw();
    };
    Graph.prototype.drawAcceleration = function () {
        this.clearCanvas();
        var accel = new Acceleration(this.ctx);
        accel.setData(this.accelereationY);
        accel.draw();
    };
    return Graph;
}());
export { Graph };
var Config = /** @class */ (function () {
    function Config() {
        this.config = {
            type: "line"
        };
    }
    Config.prototype.setData = function (points) {
        this.config.data.datasets[0].data = points;
        this.config.data.datasets[0].label = "Time(s)";
    };
    Config.prototype.draw = function () {
        this.chart.render();
    };
    return Config;
}());
var Position = /** @class */ (function (_super) {
    __extends(Position, _super);
    function Position(ctx) {
        var _this = _super.call(this) || this;
        _this.chart = new Chart(ctx, _this.config);
        _this.chart.options.title = {
            display: true,
            text: "Postion[Y] vs Time Graph"
        };
        return _this;
    }
    return Position;
}(Config));
var Velocity = /** @class */ (function (_super) {
    __extends(Velocity, _super);
    function Velocity(ctx) {
        var _this = _super.call(this) || this;
        _this.chart = new Chart(ctx, _this.config);
        _this.chart.options.title = {
            display: true,
            text: "Velocity[Y] vs Time Graph"
        };
        return _this;
    }
    return Velocity;
}(Config));
var Acceleration = /** @class */ (function (_super) {
    __extends(Acceleration, _super);
    function Acceleration(ctx) {
        var _this = _super.call(this) || this;
        _this.chart = new Chart(ctx, _this.config);
        _this.chart.options.title = {
            display: true,
            text: "Acceleration[Y] vs Time Graph"
        };
        return _this;
    }
    return Acceleration;
}(Config));
