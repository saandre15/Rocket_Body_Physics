var Rocket = /** @class */ (function () {
    function Rocket(sprite) {
        this.sprite = sprite;
        this.position = new Point(0, 0);
    }
    Rocket.prototype.setValues = function (yA, yB, mass) {
        this.yA = yA;
        this.yB = yB;
        this.mass = mass;
    };
    Rocket.prototype.getSprite = function () {
        return this.sprite;
    };
    Rocket.prototype.getCurForceY = function (time) {
        return Math.sqrt(this.yA - (this.yB * time));
    };
    Rocket.prototype.getAccelY = function (time) {
        return this.getCurForceY(time) / this.mass;
    };
    Rocket.prototype.getMass = function () {
        return this.mass;
    };
    Rocket.prototype.setPos = function (point) {
        this.position = point;
    };
    Rocket.prototype.getPos = function () {
        return this.position;
    };
    return Rocket;
}());
export { Rocket };
var Simulation = /** @class */ (function () {
    function Simulation(rocket, star) {
        this.aGravity = -9.8;
        this.fGravity = this.aGravity * rocket.getMass();
        this.canvas = document.getElementById('simulation');
        var w = this.canvas.clientWidth;
        var h = this.canvas.clientHeight;
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d');
        this.rocket = rocket;
        this.star = star;
        this.starsPos = [];
    }
    Simulation.prototype.init = function () {
        var _this = this;
        this.rocket.getSprite().addEventListener('load', function () {
            console.log("Rocket Sprite loaded");
            _this.drawInitRocket();
        });
        this.star.addEventListener('load', function () {
            console.log("Star Sprite loaded");
            for (var i = 0; i < _this.canvas.width; i++) {
                for (var e = 0; e < _this.canvas.height; e++) {
                    var rand = Math.round(Math.random() * 1000);
                    if (rand === 355) {
                        _this.starsPos.push(new Point(i, e));
                        _this.ctx.drawImage(_this.star, i, e, 10, 10);
                    }
                }
            }
        });
    };
    Simulation.prototype.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Simulation.prototype.redrawStars = function () {
        for (var i = 0; i < this.starsPos.length; i++) {
            var cur = this.starsPos[i];
            this.ctx.drawImage(this.star, cur.getX(), cur.getY(), 10, 10);
        }
    };
    Simulation.prototype.drawInitRocket = function () {
        var sprite = this.rocket.getSprite();
        var startPosX = (this.canvas.width / 10) * 4.5;
        var startPosY = (this.canvas.height / 10) * 7;
        this.ctx.drawImage(sprite, startPosX, startPosY, sprite.width, sprite.height);
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, startPosY + 18, this.canvas.width, this.canvas.height);
    };
    Simulation.prototype.setRocketValues = function (yA, yB, mass) {
        this.rocket.setValues(yA, yB, mass);
    };
    Simulation.prototype.start = function () {
        var _this = this;
        var startPosX = (this.canvas.width / 10) * 4.4;
        var startPosY = (this.canvas.height / 10) * 3;
        var redraw = function () {
            _this.clearCanvas();
            _this.redrawStars();
            _this.drawInitRocket();
            _this.ctx.fillStyle = "white";
            _this.ctx.font = 'bold 60pt Arial';
        };
        setTimeout(function () {
            redraw();
            _this.ctx.fillText("3", startPosX, startPosY);
        }, 1000);
        setTimeout(function () {
            redraw();
            _this.ctx.fillText("2", startPosX, startPosY);
        }, 2000);
        setTimeout(function () {
            redraw();
            _this.ctx.fillText("1", startPosX, startPosY);
        }, 3000);
        setTimeout(function () {
            redraw();
            _this.ctx.fillText("START", startPosX - 100, startPosY);
            setTimeout(function () { redraw(); _this.draw(); }, 1000);
            //this.draw();
        }, 4000);
    };
    Simulation.prototype.draw = function () {
        var _this = this;
        var inc = 0.001;
        var stop = false;
        var seconds = 0.0;
        var interval = setInterval(function () {
            //this.redraw(seconds);
            if (seconds === 5)
                clearInterval(interval);
            _this.clearCanvas();
            _this.redrawStars();
            _this.drawInitRocket();
            _this.redrawCalc(seconds);
            seconds += 0.001;
        }, 0.001);
    };
    Simulation.prototype.redrawCalc = function (time) {
        var textPlacementX = (this.canvas.width / 30);
        var textPlacementY = (this.canvas.height / 10);
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Time[s]", textPlacementX, textPlacementY + 0);
        this.ctx.fillText(time.toFixed(4) + " s", textPlacementX, textPlacementY + 30);
        this.ctx.fillText("Position[Y]", textPlacementX, textPlacementY + 60);
        this.ctx.fillText("(m)", textPlacementX, textPlacementY + 90);
        this.ctx.fillText("Velocity[Y]", textPlacementX, textPlacementY + 120);
        this.ctx.fillText("(m/s)", textPlacementX, textPlacementY + 150);
        this.ctx.fillText("Acceleration[Y]", textPlacementX, textPlacementY + 180);
        this.ctx.fillText("(m/s^2)", textPlacementX, textPlacementY + 210);
    };
    return Simulation;
}());
export { Simulation };
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getX = function () {
        return this.x;
    };
    Point.prototype.getY = function () {
        return this.y;
    };
    Point.prototype.setX = function (x) {
        this.x = x;
    };
    Point.prototype.setY = function (y) {
        this.y = y;
    };
    Point.prototype.setXY = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Point;
}());
export { Point };
