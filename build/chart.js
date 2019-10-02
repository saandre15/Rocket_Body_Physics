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
var Config = /** @class */ (function () {
    function Config(canvas) {
        this.config = {
            type: "line"
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    Config.prototype.setData = function (points) {
        this.config.data.datasets[0].data = points;
        this.config.data.datasets[0].label = "Time(s)";
    };
    return Config;
}());
var Position = /** @class */ (function (_super) {
    __extends(Position, _super);
    function Position(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.chart = new Chart(_this.ctx, _this.config);
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
    function Velocity(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.chart = new Chart(_this.ctx, _this.config);
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
    function Acceleration(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.chart = new Chart(_this.ctx, _this.config);
        _this.chart.options.title = {
            display: true,
            text: "Acceleration[Y] vs Time Graph"
        };
        return _this;
    }
    return Acceleration;
}(Config));
