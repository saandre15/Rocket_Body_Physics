import {  Simulation, Rocket } from "./simulation";
import { Graph } from "./charts";

// These are the HTML Buttons and Inputs

const start: HTMLButtonElement = document.getElementById('start') as HTMLButtonElement;
const restart: HTMLButtonElement = document.getElementById('restart') as HTMLButtonElement;
const mass: HTMLInputElement = document.getElementById('mass') as HTMLInputElement;
const A: HTMLInputElement = document.getElementById('A') as HTMLInputElement;
const B: HTMLInputElement = document.getElementById('B') as HTMLInputElement;
const AirResToggle: HTMLButtonElement = document.getElementById('air_resistance') as HTMLButtonElement;
const ParchuteToggle: HTMLButtonElement = document.getElementById('parachute') as HTMLButtonElement;
const SimulationToggle: HTMLButtonElement = document.getElementById('simulation_toggle') as HTMLButtonElement;
const GraphToggle: HTMLButtonElement = document.getElementById('graph_toggle') as HTMLButtonElement;
const parachuteC: HTMLInputElement = document.getElementById('c') as HTMLInputElement;
const airResistanceB: HTMLInputElement = document.getElementById('b') as HTMLInputElement;

// This is where the class are preinitializes before the DOM loads

const rocket = new Rocket(0, 0);
const simulation = new Simulation([rocket]);
const graph = new Graph(simulation);

window.addEventListener('load', (e: Event) => {
  // This is where the classes initializes after the DOM loads
  simulation.init();
})


start.addEventListener('click', (e: MouseEvent) => {
  e.preventDefault();
  AirResToggle.disabled = true;
  ParchuteToggle.disabled = true;
  start.disabled = true;
  setRocketValues();
  if(document.getElementById('graphCanvas')) {
    graph.init();
    graph.setCalc();
  }
  else if(document.getElementById('simulation'))
    simulation.start();
});

restart.addEventListener('click', (e: MouseEvent) => {
  location.replace(location.href);
});

AirResToggle.addEventListener('click', (e: MouseEvent) => {
  simulation.toggleAirResistance();
  simulation.drawToggle();
});

ParchuteToggle.addEventListener('click', (e: MouseEvent) => {
  simulation.toggleParachute()
  simulation.drawToggle();
});

SimulationToggle.addEventListener('click', (e: MouseEvent) => {
  if(document.getElementById('simulation') ) {
    return;
  }
  else {
    const child: Node = document.getElementById('graphCanvas');
    const parent: Node = child.parentNode;
    parent.removeChild(child);
    const sim: HTMLCanvasElement = document.createElement('canvas');
    sim.id = 'simulation';
    sim.className = 'w-100';
    sim.style.backgroundColor = 'black';
    parent.appendChild(sim);
    document.getElementById('graph_toggle_buttons').remove();
    simulation.resetCanvas();
    simulation.init();
  }
});

GraphToggle.addEventListener('click', (e: MouseEvent) => {
  if(document.getElementById('graph')) {
    return;
  }
  else {
    const child: ChildNode = document.getElementById('simulation');
    let parent: HTMLElement = child.parentElement;
    child.remove();
    const graphCanvas: HTMLCanvasElement = document.createElement('canvas');
    graphCanvas.id = 'graphCanvas';
    graphCanvas.className = 'w-100';
    parent.appendChild(graphCanvas);
    const buttons: string = `<div class="btn-group mt-4" id="graph_toggle_buttons">
      <button class="btn btn-primary" id="position_toggle">Position Mode</button>
      <button class="btn btn-primary" id="velocity_toggle">Velocity Mode</button>
      <button class="btn btn-primary" id="acceleration_toggle">Acceleration Mode</button>
      </div>`;
    parent.insertAdjacentHTML('beforeend', buttons);
    graph.init();
    const pos_toggle = document.getElementById('position_toggle') as HTMLButtonElement;
    const vel_toggle = document.getElementById('velocity_toggle') as HTMLButtonElement;
    const accel_toggle = document.getElementById('acceleration_toggle') as HTMLButtonElement;
    pos_toggle.addEventListener('click', (e: MouseEvent) => graph.drawPosition());
    vel_toggle.addEventListener('click', (e: MouseEvent) => graph.drawVelocity());
    accel_toggle.addEventListener('click', (e: MouseEvent) => graph.drawAcceleration());
    pos_toggle.disabled = true;
    vel_toggle.disabled = true;
    accel_toggle.disabled = true;
  }
});

function setRocketValues(): boolean {
  const nMass: number = Number(mass.value);
  const nA: number = Number(A.value);
  const nB: number = Number(B.value);
  const pC: number = Number(parachuteC.value);
  const aB: number = Number(airResistanceB.value);
  if(!nMass || !nA || !nB) {
    alert("Please make sure there is a number inputed into the mass, A, and B.");
    return false;
  }
  if(isNaN(nMass) || isNaN(nA) || isNaN(nB) || isNaN(pC) || isNaN(aB)) {
    alert("The inputs only allow numbers.");
    return false;
  }
  rocket.setValues(nA, nB, nMass);
  rocket.setParachuteDragForce(pC ? pC : 0);
  simulation.setAirResistance(aB ? aB : 0);
  return true;
}