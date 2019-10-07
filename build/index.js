import { Simulation, Rocket } from "./simulation";
import { Graph } from "./charts";
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
var graph = new Graph(simulation);
window.addEventListener('load', function (e) {
    simulation.init();
});
start.addEventListener('click', function (e) {
    e.preventDefault();
    AirResToggle.disabled = true;
    ParchuteToggle.disabled = true;
    start.disabled = true;
    setRocketValues();
    if (document.getElementById('graphCanvas')) {
        graph.init();
        graph.setCalc();
    }
    else if (document.getElementById('simulation'))
        simulation.start();
});
restart.addEventListener('click', function (e) {
    location.replace(location.href);
});
AirResToggle.addEventListener('click', function (e) {
    state.air_resistance = !state.air_resistance;
    simulation.drawToggle();
});
ParchuteToggle.addEventListener('click', function (e) {
    state.parachute = !state.parachute;
    simulation.drawToggle();
});
SimulationToggle.addEventListener('click', function (e) {
    if (document.getElementById('simulation')) {
        return;
    }
    else {
        var child = document.getElementById('graphCanvas');
        var parent_1 = child.parentNode;
        parent_1.removeChild(child);
        var sim = document.createElement('canvas');
        sim.id = 'simulation';
        sim.className = 'w-100';
        sim.style.backgroundColor = 'black';
        parent_1.appendChild(sim);
        document.getElementById('graph_toggle_buttons').remove();
        simulation.resetCanvas();
        simulation.init();
    }
});
GraphToggle.addEventListener('click', function (e) {
    if (document.getElementById('graph')) {
        return;
    }
    else {
        var child = document.getElementById('simulation');
        var parent_2 = child.parentElement;
        child.remove();
        var graphCanvas = document.createElement('canvas');
        graphCanvas.id = 'graphCanvas';
        graphCanvas.className = 'w-100';
        parent_2.appendChild(graphCanvas);
        var buttons = "<div class=\"btn-group mt-4\" id=\"graph_toggle_buttons\">\n      <button class=\"btn btn-primary\" id=\"position_toggle\">Position Mode</button>\n      <button class=\"btn btn-primary\" id=\"velocity_toggle\">Velocity Mode</button>\n      <button class=\"btn btn-primary\" id=\"acceleration_toggle\">Acceleration Mode</button>\n      </div>";
        parent_2.insertAdjacentHTML('beforeend', buttons);
        graph.init();
        var pos_toggle = document.getElementById('position_toggle');
        var vel_toggle = document.getElementById('velocity_toggle');
        var accel_toggle = document.getElementById('acceleration_toggle');
        pos_toggle.addEventListener('click', function (e) { return graph.drawPosition(); });
        vel_toggle.addEventListener('click', function (e) { return graph.drawVelocity(); });
        accel_toggle.addEventListener('click', function (e) { return graph.drawAcceleration(); });
        pos_toggle.disabled = true;
        vel_toggle.disabled = true;
        accel_toggle.disabled = true;
    }
});
function setRocketValues() {
    var nMass = Number(mass.value);
    var nA = Number(A.value);
    var nB = Number(B.value);
    if (!nMass || !nA || !nB) {
        alert("Please make sure there is a valid number inputed into the mass, A, and B.");
        return;
    }
    rocket.setValues(nA, nB, nMass);
}
