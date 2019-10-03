import { Simulation, Rocket } from "./simulation";
var start = document.getElementById('start');
var restart = document.getElementById('restart');
var mass = document.getElementById('mass');
var A = document.getElementById('a');
var B = document.getElementById('b');
var AirResToggle = document.getElementById('air_resistance');
var ParchuteToggle = document.getElementById('parachute');
var SimulationToggle = document.getElementById('simulation_toggle');
var GraphToggle = document.getElementById('graph_toggle');
var state = {
    simulation: false,
    air_resistance: false,
    parachute: false,
};
var rocket = new Rocket(0, 0);
var simulation = new Simulation([rocket]);
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
    if (document.getElementById('simulation')) {
        console.log(document.getElementById('simulation'));
        return;
    }
    else {
        var child = document.getElementById('graph');
        var parent_1 = child.parentNode;
        parent_1.removeChild(child);
        var sim = document.createElement('canvas');
        sim.id = 'simulation';
        sim.className = 'w-100';
        sim.style.backgroundColor = 'black';
        parent_1.appendChild(sim);
        simulation.resetCanvas();
        simulation.init();
    }
});
GraphToggle.addEventListener('click', function (e) {
    if (document.getElementById('graph')) {
        console.log(document.getElementById('graph'));
        return;
    }
    else {
        var child = document.getElementById('simulation');
        var parent_2 = child.parentNode;
        parent_2.removeChild(child);
        var graph = document.createElement('canvas');
        graph.id = 'graph';
        graph.className = 'w-100';
        graph.style.backgroundColor = 'blue';
        parent_2.appendChild(graph);
        var parentEl = graph.parentElement;
        var buttons = "<div class=\"btn-group mb-3\">\n      <button class=\"btn btn-primary active\" id=\"simulation_toggle\">Simulation Mode</button>\n      <button class=\"btn btn-primary\" id=\"graph_toggle\">Graph Mode</button>\n      </div>";
        parentEl.insertAdjacentHTML('beforeend', buttons);
    }
});
