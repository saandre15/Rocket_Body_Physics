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
import * as Chart from "chart.js";
var Graph = /** @class */ (function () {
    function Graph(simulation) {
        this.simulation = simulation;
        this.positionsY = [];
        this.velocitiesY = [];
        this.accelereationY = [];
        this.time = [];
    }
    Graph.prototype.init = function () {
        this.canvas = document.getElementById('graphCanvas');
        this.ctx = this.canvas.getContext('2d');
        var w = this.canvas.clientWidth;
        var h = this.canvas.clientHeight;
        this.canvas.width = w;
        this.canvas.height = h;
        this.drawPosition();
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
        var _this = this;
        var earth = this.simulation.getEarth();
        var go = true;
        var inc = 0.1;
        var total = 0;
        var interval = setInterval(function () {
            var displacement = earth.getObjs()[0].getPos().getY();
            if (displacement < 0) {
                clearInterval(interval);
                var pos_toggle = document.getElementById('position_toggle');
                var vel_toggle = document.getElementById('velocity_toggle');
                var accel_toggle = document.getElementById('acceleration_toggle');
                pos_toggle.disabled = false;
                vel_toggle.disabled = false;
                accel_toggle.disabled = false;
                return;
            }
            _this.positionsY.push(displacement);
            _this.velocitiesY.push(earth.getNetVelocity(0));
            _this.accelereationY.push(earth.getNetAcceleration(0));
            _this.time.push(total);
            _this.drawPosition();
            earth.setTime(total + inc);
            total += inc;
        }, 0.00000001);
    };
    Graph.prototype.drawPosition = function () {
        var pos = new Position(this.ctx);
        pos.setData(this.positionsY, this.time, "Position");
        pos.draw();
    };
    Graph.prototype.drawVelocity = function () {
        var vel = new Velocity(this.ctx);
        vel.setData(this.velocitiesY, this.time, "Velocity");
        vel.draw();
    };
    Graph.prototype.drawAcceleration = function () {
        var accel = new Acceleration(this.ctx);
        accel.setData(this.accelereationY, this.time, "Acceleration");
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
    Config.prototype.setData = function (points, times, name) {
        this.config.data.labels = times.map(function (cur) { return cur.toString(); });
        this.config.data.datasets.push({
            data: points,
            label: name,
        });
    };
    Config.prototype.draw = function () {
        this.chart.update({ duration: 5, lazy: false, easing: 'easeInElastic' });
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
            text: "Postion[Y] vs Time[S] Graph"
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
            text: "Velocity[Y] vs Time[S] Graph"
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
            text: "Acceleration[Y] vs Time[S] Graph"
        };
        return _this;
    }
    return Acceleration;
}(Config));
