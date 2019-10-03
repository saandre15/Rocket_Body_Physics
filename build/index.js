import { Simulation, Rocket } from "./simulation";
var start = document.getElementById('start');
var restart = document.getElementById('restart');
var mass = document.getElementById('mass');
var A = document.getElementById('a');
var B = document.getElementById('b');
var AirResToggle = document.getElementById('air_resistance');
var ParchuteToggle = document.getElementById('parachute');
var state = {
    simulation: false,
    air_resistance: false,
    parachute: false,
};
var rocket = new Rocket(0, 0);
var simulation = new Simulation([rocket]);
simulation.init();
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
