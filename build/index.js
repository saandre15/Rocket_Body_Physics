import { Rocket, Simulation } from "./simulation";
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
var rocket = new Rocket(rocketSprite);
var simulation = new Simulation(rocket, starSprite);
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
