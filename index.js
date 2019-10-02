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
var mass = document.getElementById('mass');
var A = document.getElementById('a');
var B = document.getElementById('b');
var state = {
    simulation: false
};
var starSprite = new Image(10, 10);
starSprite.src = "https://clipart.info/images/ccovers/1531014986Gold-Star-Transparent-PNG-Clip-Art.png";
var rocketSprite = new Image(30, 30);
rocketSprite.src = "http://pngimg.com/uploads/rockets/rockets_PNG13291.png";
var rocket = new _simulation__WEBPACK_IMPORTED_MODULE_0__["Rocket"](rocketSprite);
var simulation = new _simulation__WEBPACK_IMPORTED_MODULE_0__["Simulation"](rocket, starSprite);
simulation.init();
start.addEventListener('click', function (e) {
    e.preventDefault();
    var nMass = Number(mass.value);
    var nA = Number(A.value);
    var nB = Number(B.value);
    if (!nMass || !nA) {
        alert("Please make sure there is a valid number inputed into the mass, A, and B.");
        return;
    }
    if (!nB)
        nB = 0;
    document.getElementById('start').disabled = true;
    simulation.setRocketValues(nA, nB, nMass);
    simulation.start();
});


/***/ }),

/***/ "./build/simulation.js":
/*!*****************************!*\
  !*** ./build/simulation.js ***!
  \*****************************/
/*! exports provided: Rocket, Simulation, Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rocket", function() { return Rocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Simulation", function() { return Simulation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
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
        this.fGravity = this.aGravity * this.rocket.getMass();
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
        }, 4000);
    };
    Simulation.prototype.draw = function () {
        var _this = this;
        var inc = 0.1;
        var seconds = 0.0;
        var passInit = false;
        var interval = setInterval(function () {
            console.log(_this.getYDisplacement(seconds));
            if (_this.getYDisplacement(seconds) < 0) {
                console.log("Clear interval");
                clearInterval(interval);
            }
            seconds += inc;
            _this.clearCanvas();
            _this.redrawStars();
            _this.drawInitRocket();
            _this.redrawCalc(seconds);
            //this.redraw(seconds);
            _this.getYDisplacement(seconds, true);
        }, inc);
        return;
    };
    Simulation.prototype.redrawCalc = function (time) {
        var textPlacementX = (this.canvas.width / 30);
        var textPlacementY = (this.canvas.height / 10);
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Time[s]", textPlacementX, textPlacementY + 0);
        this.ctx.fillText(time.toFixed(4) + " s", textPlacementX, textPlacementY + 30);
        this.ctx.fillText("Position[Y]", textPlacementX, textPlacementY + 60);
        this.ctx.fillText(this.getYDisplacement(time) + "(m)", textPlacementX, textPlacementY + 90);
        this.ctx.fillText("Velocity[Y]", textPlacementX, textPlacementY + 120);
        this.ctx.fillText(this.getYVel(time) + "(m/s)", textPlacementX, textPlacementY + 150);
        this.ctx.fillText("Acceleration[Y]", textPlacementX, textPlacementY + 180);
        this.ctx.fillText(this.getYAccel(time) + "(m/s^2)", textPlacementX, textPlacementY + 210);
    };
    Simulation.prototype.redraw = function (time) {
        var yVel = this.getYVel(time);
        this.rocket.setPos(new Point(this.rocket.getPos().getX(), this.rocket.getPos().getY() + yVel));
    };
    Simulation.prototype.getYDisplacement = function (time, autoinc) {
        var yDisplacement = this.rocket.getPos().getY() + this.getYVel(time);
        if (autoinc)
            this.rocket.setPos(new Point(this.rocket.getPos().getX(), yDisplacement));
        return yDisplacement;
    };
    Simulation.prototype.getYVel = function (time) {
        var rForceY = this.rocket.getCurForceY(time);
        var tForceY = rForceY + this.fGravity;
        var yVel = (tForceY * time) / this.rocket.getMass();
        return yVel;
    };
    Simulation.prototype.getYAccel = function (time) {
        var rForceY = this.rocket.getCurForceY(time);
        var tForceY = rForceY + this.fGravity;
        var yAccel = tForceY / this.rocket.getMass();
        return yAccel;
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