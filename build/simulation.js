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
var Object = /** @class */ (function () {
    function Object(sprite, x, y) {
        var _this = this;
        this.time = 0;
        this.ready = false;
        this.sprite = sprite;
        this.position = new Point(x, y);
        this.sprite.addEventListener('load', function () { return _this.ready = true; });
    }
    Object.prototype.getSprite = function () {
        return this.sprite;
    };
    Object.prototype.getCurForceY = function () {
        return -1;
    };
    Object.prototype.getAccelY = function () {
        return this.getCurForceY() / this.mass;
    };
    Object.prototype.getVeloY = function () {
        return (this.getCurForceY() * this.time) / this.mass;
    };
    Object.prototype.getMass = function () {
        return this.mass;
    };
    Object.prototype.setPos = function (point) {
        this.position = point;
    };
    Object.prototype.getPos = function () {
        return this.position;
    };
    Object.prototype.setTime = function (seconds) {
        this.time = seconds;
    };
    return Object;
}());
var Rocket = /** @class */ (function (_super) {
    __extends(Rocket, _super);
    function Rocket(x, y) {
        var _this = this;
        var sprite = new Image(30, 30);
        sprite.src = "https://drive.google.com/uc?export=view&id=1p5huN9IbFfPHRtKVC6E_Q4cgJN336ADt";
        _this = _super.call(this, sprite, x, y) || this;
        var parachute = new Image(40, 40);
        parachute.src = "https://drive.google.com/uc?export=view&id=1gwtaDwG3_D_1OJmImbBtUUtUlrlNKtRl";
        _this.parachute = parachute;
        _this.parachuteMode = false;
        return _this;
    }
    Rocket.prototype.getCurForceY = function () {
        if (!this.yA || !this.yB || !this.mass)
            alert("Please set the A, B, and Mass.");
        var force = Math.sqrt(this.yA - (this.yB * this.time));
        if (isNaN(force))
            return 0;
        else
            return force;
    };
    Rocket.prototype.setValues = function (yA, yB, mass) {
        this.yA = yA;
        this.yB = yB;
        this.mass = mass;
    };
    Rocket.prototype.setParachuteDragForce = function (c) {
        this.parchuteC = c;
    };
    Rocket.prototype.getParachuteC = function () {
        return this.parchuteC;
    };
    Rocket.prototype.activateParachute = function () {
        this.parachuteMode = true;
    };
    Rocket.prototype.getParachute = function () {
        return this.parachute;
    };
    Rocket.prototype.hasParachute = function () {
        return this.parachuteMode;
    };
    return Rocket;
}(Object));
export { Rocket };
var Planet = /** @class */ (function () {
    function Planet(objs) {
        this.objs = objs;
        this.enableAirResistance = false;
        this.enableParachute = false;
        this.time = 0;
        this.gAccel = 0;
        this.airResC = 0;
        this.velocities = new Array(this.objs.length);
        this.accelerations = new Array(this.objs.length);
        for (var i = 0; i < this.objs.length; i++) {
            this.velocities[i] = 0;
            this.accelerations[i] = 0;
        }
    }
    Planet.prototype.toggleParachute = function () {
        this.enableParachute = !this.enableParachute;
    };
    Planet.prototype.toggleAirRes = function () {
        this.enableAirResistance = !this.enableAirResistance;
    };
    Planet.prototype.hasAirRes = function () {
        return this.enableAirResistance;
    };
    Planet.prototype.hasParachute = function () {
        return this.enableParachute;
    };
    Planet.prototype.setGAccel = function (accel) {
        this.gAccel = accel;
    };
    Planet.prototype.setAirResC = function (c) {
        this.airResC = c;
    };
    Planet.prototype.getAirRes = function (time) {
        return this.airResC;
    };
    Planet.prototype.getObjs = function () {
        return this.objs;
    };
    Planet.prototype.setTime = function (seconds) {
        for (var i = 0; i < this.objs.length; i++) {
            var cur = this.objs[i];
            var pos = cur.getPos();
            // Increment time
            this.velocities[i] = this.getObjNetVelY(i, seconds, this.time, this.accelerations[i], this.velocities[i]);
            this.accelerations[i] = this.getObjNetAccelY(i);
            if (this.getNetVelocity(i) < 0 && cur instanceof Rocket)
                //if(cur instanceof Rocket)
                cur.activateParachute();
            var displaceY = pos.getY() + this.getNetVelocity(i);
            cur.setPos(new Point(pos.getX(), displaceY));
            this.time = seconds;
        }
    };
    Planet.prototype.getTime = function () {
        return this.time;
    };
    Planet.prototype.getObjNetForceY = function (index) {
        var obj = this.objs[index];
        var oForce = obj.getCurForceY();
        var gForce = obj.getMass() * this.gAccel;
        var dForce = 0;
        var aForce = 0;
        if (this.getObjs()[index] instanceof Rocket) {
            var rocket = this.getObjs()[index];
            if (rocket.hasParachute() && this.enableParachute) {
                dForce = rocket.getParachuteC() * (this.getNetVelocity(index) * this.getNetVelocity(index));
                // dForce = -1 * rocket.getParachuteC() * this.getNetVelocity(index) ;
            }
        }
        if (this.enableAirResistance)
            aForce = this.airResC ? -this.airResC * this.getNetVelocity(index) : 0;
        return oForce + gForce + aForce + dForce;
    };
    Planet.prototype.getObjNetAccelY = function (index) {
        var obj = this.objs[index];
        var nForce = this.getObjNetForceY(index);
        var accelY = nForce / obj.getMass();
        return accelY;
    };
    // this wont work because it taking the net force at this time and mutiplying with all time
    // return (nForce * this.time) / obj.getMass();
    Planet.prototype.getObjNetVelY = function (index, time, prevTime, prevAccel, prevVel) {
        // take the time inc * ( ( accel of now + accel of next inc )  / 2)
        this.objs[index].setTime(time);
        var cur = (time - prevTime) * ((this.getObjNetAccelY(index) + prevAccel) / 2) + prevVel;
        return cur;
    };
    Planet.prototype.getNetVelocity = function (index) {
        return this.velocities[index];
    };
    Planet.prototype.getNetAcceleration = function (index) {
        return this.accelerations[index];
    };
    Planet.prototype.getNetDistance = function (index) {
        return this.getObjs()[index].getPos().getY();
    };
    return Planet;
}());
export { Planet };
var Stars = /** @class */ (function () {
    function Stars() {
        var _this = this;
        this.ready = false;
        this.positions = [];
        this.image = new Image(10, 10);
        this.image.src = "https://drive.google.com/uc?export=view&id=1ACupvOABzxwP1AL8EvL-iyFokYMPHNIN";
        this.image.addEventListener('load', function () { return _this.ready = true; });
    }
    Stars.prototype.arrange = function (width, height) {
        for (var i = 0; i < width; i++) {
            for (var e = 0; e < height; e++) {
                var rand = Math.round(Math.random() * 1000);
                if (rand === 355) {
                    this.positions.push(new Point(i, e));
                }
            }
        }
    };
    Stars.prototype.getPositions = function () {
        return this.positions;
    };
    Stars.prototype.getImage = function () {
        return this.image;
    };
    return Stars;
}());
export { Stars };
var Simulation = /** @class */ (function () {
    function Simulation(objs) {
        this.earth = new Planet(objs);
        this.earth.setGAccel(-9.8);
        this.canvas = document.getElementById('simulation');
        var w = this.canvas.clientWidth;
        var h = this.canvas.clientHeight;
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d');
        this.stars = new Stars();
        this.stars.arrange(this.canvas.width, this.canvas.height);
    }
    Simulation.prototype.toggleParachute = function () {
        this.earth.toggleParachute();
    };
    Simulation.prototype.toggleAirResistance = function () {
        this.earth.toggleAirRes();
    };
    Simulation.prototype.setAirResistance = function (c) {
        this.earth.setAirResC(c);
    };
    Simulation.prototype.getEarth = function () {
        return this.earth;
    };
    Simulation.prototype.resetCanvas = function () {
        this.canvas = document.getElementById('simulation');
        var w = this.canvas.clientWidth;
        var h = this.canvas.clientHeight;
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d');
    };
    Simulation.prototype.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Simulation.prototype.drawStars = function () {
        var positions = this.stars.getPositions();
        for (var i = 0; i < positions.length; i++) {
            var cur = positions[i];
            this.ctx.drawImage(this.stars.getImage(), cur.getX(), cur.getY(), 10, 10);
        }
    };
    Simulation.prototype.drawPosition = function () {
        var startPosX = (this.canvas.width / 10) * 4.5;
        var startPosY = (this.canvas.height / 10) * 7;
        var scale = 1000;
        for (var i = 0; i < this.earth.getObjs().length; i++) {
            var cur = this.earth.getObjs()[i];
            var position = cur.getPos();
            this.ctx.drawImage(cur.getSprite(), startPosX, startPosY - (position.getY() / scale), cur.getSprite().width, cur.getSprite().height);
            if (cur instanceof Rocket) {
                var parachute = cur.getParachute();
                if (cur.hasParachute() && this.earth.hasParachute())
                    this.ctx.drawImage(parachute, startPosX - 5, startPosY - ((position.getY() / scale)) - 30, parachute.width, parachute.height);
            }
        }
    };
    Simulation.prototype.drawLandscape = function () {
        var startPosX = (this.canvas.width / 10) * 4.5;
        var startPosY = (this.canvas.height / 10) * 7;
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, startPosY + 18, this.canvas.width, this.canvas.height);
    };
    Simulation.prototype.drawCalc = function (obj) {
        var textPlacementX = (this.canvas.width / 30);
        var textPlacementY = (this.canvas.height / 10);
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
    };
    Simulation.prototype.drawToggle = function () {
        this.clearCanvas();
        this.drawStars();
        this.drawPosition();
        this.drawLandscape();
        var textPlacementX = (this.canvas.width / 30) * 29;
        var textPlacementY = (this.canvas.height / 10);
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = 'right';
        this.ctx.fillText(this.earth.hasAirRes() ? "Air Resistance ON" : "Air Resistance OFF", textPlacementX, textPlacementY + 0);
        this.ctx.fillText(this.earth.hasParachute() ? "Parachute ON" : "Parachute OFF", textPlacementX, textPlacementY + 30);
    };
    Simulation.prototype.draw = function () {
        var _this = this;
        var inc = 0.1;
        var seconds = 0.0;
        var prevDist = 0;
        var interval = setInterval(function () {
            seconds += inc;
            _this.clearCanvas();
            _this.drawStars();
            _this.drawPosition();
            _this.drawLandscape();
            _this.drawCalc(0);
            var displace = _this.earth.getObjs()[0].getPos().getY();
            if (displace < 0) {
                _this.earth.getObjs()[0].getPos().setY(0);
                _this.clearCanvas();
                _this.drawStars();
                _this.drawPosition();
                _this.drawLandscape();
                _this.drawCalc(0);
                alert("Simulation is complete the rocket is back on the surface. If your rocket didn't move there isn't enough force to propel it up.");
                clearInterval(interval);
            }
            prevDist = displace;
            _this.earth.setTime(seconds);
        }, inc);
        return;
    };
    Simulation.prototype.init = function () {
        this.drawStars();
        this.drawPosition();
        this.drawLandscape();
        this.drawToggle();
    };
    Simulation.prototype.start = function () {
        var _this = this;
        var startPosX = (this.canvas.width / 10) * 4.6;
        var startPosY = (this.canvas.height / 10) * 3;
        var redraw = function () {
            _this.clearCanvas();
            _this.drawStars();
            _this.drawPosition();
            _this.drawLandscape();
            _this.ctx.fillStyle = "white";
            _this.ctx.font = 'bold 60pt Arial';
            _this.ctx.textAlign = 'center';
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
            _this.ctx.fillText("START", startPosX, startPosY);
            setTimeout(function () { redraw(); _this.draw(); }, 1000);
        }, 4000);
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
