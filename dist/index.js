/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/index.js":
/*!************************!*\
  !*** ./build/index.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simulation */ "./build/simulation.js");

var start = document.getElementById('start');
var restart = document.getElementById('restart');
var mass = document.getElementById('mass');
var A = document.getElementById('a');
var B = document.getElementById('b');
var AirResToggle = document.getElementById('air_resistance');
var ParchuteToggle = document.getElementById('parachute');
var SimulationToggle = document.getElementById('parachute');
var GraphToggle = document.getElementById('parachute');
var state = {
    simulation: false,
    air_resistance: false,
    parachute: false,
};
var rocket = new _simulation__WEBPACK_IMPORTED_MODULE_0__["Rocket"](0, 0);
var simulation = new _simulation__WEBPACK_IMPORTED_MODULE_0__["Simulation"]([rocket]);
simulation.init();
window.addEventListener('load', function (e) {
});
start.addEventListener('click', function (e) {
    e.preventDefault();
    AirResToggle.disabled = true;
    ParchuteToggle.disabled = true;
    start.disabled = true;
    var nMass = Number(mass.value);
    var nA = Number(A.value);
    var nB = Number(B.value);
    if (!nMass || !nA || !nB) {
        alert("Please make sure there is a valid number inputed into the mass, A, and B.");
        return;
    }
    rocket.setValues(nA, nB, nMass);
    simulation.start();
});
restart.addEventListener('click', function (e) {
    location.replace(location.href);
});
AirResToggle.addEventListener('click', function (e) {
    state.air_resistance = !state.air_resistance;
    simulation.drawToggle(state.air_resistance, state.parachute);
});
ParchuteToggle.addEventListener('click', function (e) {
    state.parachute = !state.parachute;
    simulation.drawToggle(state.air_resistance, state.parachute);
});
SimulationToggle.addEventListener('click', function (e) {
    // Render Simulation
    if (document.getElementById('simulation'))
        return;
    else {
        var child = document.getElementById('graph');
        var parent_1 = child.parentNode.removeChild(child);
        var sim = document.createElement('canvas');
    }
});
GraphToggle.addEventListener('click', function (e) {
    // Render Graph
});


/***/ }),

/***/ "./build/simulation.js":
/*!*****************************!*\
  !*** ./build/simulation.js ***!
  \*****************************/
/*! exports provided: Rocket, Planet, Stars, Simulation, Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rocket", function() { return Rocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Planet", function() { return Planet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stars", function() { return Stars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Simulation", function() { return Simulation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
var __extends = (undefined && undefined.__extends) || (function () {
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
        sprite.src = "https://doc-0c-8g-docs.googleusercontent.com/docs/securesc/iac1qqlf7mqg6sqoud6q6lhecdqv29k5/vnb6e7l1suspbbs9eeh9ols0o20k0o5i/1570104000000/07533854220223604679/07533854220223604679/1p5huN9IbFfPHRtKVC6E_Q4cgJN336ADt?h=17899650111478229776&e=view";
        _this = _super.call(this, sprite, x, y) || this;
        var parachute = new Image(40, 40);
        parachute.src = "https://doc-0k-8g-docs.googleusercontent.com/docs/securesc/iac1qqlf7mqg6sqoud6q6lhecdqv29k5/uj7ndp8vrio8vhomjkqtk4dhd73rr8ql/1570104000000/07533854220223604679/07533854220223604679/1gwtaDwG3_D_1OJmImbBtUUtUlrlNKtRl?h=17899650111478229776&e=view";
        _this.parachute = parachute;
        _this.parachuteMode = false;
        return _this;
    }
    Rocket.prototype.getCurForceY = function () {
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

var Planet = /** @class */ (function () {
    function Planet(objs) {
        this.objs = objs;
        this.time = 0;
        this.gAccel = 0;
        this.airResB = 0;
        this.velocities = new Array(this.objs.length);
        this.accelerations = new Array(this.objs.length);
        for (var i = 0; i < this.objs.length; i++) {
            this.velocities[i] = 0;
            this.accelerations[i] = 0;
        }
    }
    Planet.prototype.setGAccel = function (accel) {
        this.gAccel = accel;
    };
    Planet.prototype.setAirResB = function (b) {
        this.airResB = b;
    };
    Planet.prototype.getAirRes = function (time) {
        return this.airResB;
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
        var aForce = this.airResB ? -this.airResB * obj.getVeloY() : 0;
        return oForce + gForce + aForce;
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
    return Planet;
}());

var Stars = /** @class */ (function () {
    function Stars() {
        var _this = this;
        this.ready = false;
        this.positions = [];
        this.image = new Image(10, 10);
        this.image.src = "https://doc-0c-8g-docs.googleusercontent.com/docs/securesc/iac1qqlf7mqg6sqoud6q6lhecdqv29k5/nfigomqijelofn19ltuiecdgvlakeksh/1570104000000/07533854220223604679/07533854220223604679/1ACupvOABzxwP1AL8EvL-iyFokYMPHNIN?e=view&h=17899650111478229776&nonce=7b6osqtrkb7uc&user=07533854220223604679&hash=0uv7hitspjc7q7blcqjpdgcrc97anj6s";
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
    Simulation.prototype.init = function () {
        this.drawStars();
        this.drawPosition();
        this.drawLandscape();
        this.drawToggle(false, false);
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
                if (cur.hasParachute())
                    this.ctx.drawImage(parachute, startPosX - 5, startPosY - (position.getY() / scale) - 30, parachute.width, parachute.height);
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
    Simulation.prototype.drawToggle = function (sAirRes, sParchute) {
        this.clearCanvas();
        this.drawStars();
        this.drawPosition();
        this.drawLandscape();
        var textPlacementX = (this.canvas.width / 30) * 24;
        var textPlacementY = (this.canvas.height / 10);
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = "white";
        this.ctx.fillText(sAirRes ? "Air Resistance ON" : "Air Resistance OFF", textPlacementX, textPlacementY + 0);
        this.ctx.fillText(sParchute ? "Parachute ON" : "Parachute OFF", textPlacementX + 38, textPlacementY + 30);
    };
    Simulation.prototype.start = function () {
        var _this = this;
        var startPosX = (this.canvas.width / 10) * 4.4;
        var startPosY = (this.canvas.height / 10) * 3;
        var redraw = function () {
            _this.clearCanvas();
            _this.drawStars();
            _this.drawPosition();
            _this.drawLandscape();
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
        }, 4000);
    };
    Simulation.prototype.draw = function () {
        var _this = this;
        var inc = 0.1;
        var seconds = 0.0;
        var interval = setInterval(function () {
            //if(this.getYDisplacement(seconds) < 0) {
            //  console.log("Clear interval");
            //  clearInterval(interval);
            //}
            seconds += inc;
            _this.clearCanvas();
            _this.drawStars();
            _this.drawPosition();
            _this.drawLandscape();
            _this.drawCalc(0);
            if (_this.earth.getObjs()[0].getPos().getY() == 0) {
                alert("Simulation is complete the rocket is back on the surface. If your rocket didn't move there isn't enough force to propel it up.");
                clearInterval(interval);
            }
            _this.earth.setTime(seconds);
        }, inc);
        return;
    };
    return Simulation;
}());

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



/***/ })

/******/ });
//# sourceMappingURL=index.js.map