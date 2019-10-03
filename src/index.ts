import {  Simulation, Rocket } from "./simulation";

const start: HTMLButtonElement = document.getElementById('start') as HTMLButtonElement;
const restart: HTMLButtonElement = document.getElementById('restart') as HTMLButtonElement;
const mass: HTMLInputElement = document.getElementById('mass') as HTMLInputElement;
const A: HTMLInputElement = document.getElementById('a') as HTMLInputElement;
const B: HTMLInputElement = document.getElementById('b') as HTMLInputElement;
const AirResToggle: HTMLButtonElement = document.getElementById('air_resistance') as HTMLButtonElement;
const ParchuteToggle: HTMLButtonElement = document.getElementById('parachute') as HTMLButtonElement;
const SimulationToggle: HTMLButtonElement = document.getElementById('simulation_toggle') as HTMLButtonElement;
const GraphToggle: HTMLButtonElement = document.getElementById('graph_toggle') as HTMLButtonElement;

const state = {
  simulation: false,
  air_resistance: false,
  parachute: false,
}

const rocket = new Rocket(0, 0);
const simulation = new Simulation([rocket]);
simulation.init();

window.addEventListener('load', (e: Event) => {

})

start.addEventListener('click', (e: MouseEvent) => {
  e.preventDefault();
  AirResToggle.disabled = true;
  ParchuteToggle.disabled = true;
  start.disabled = true;
  const nMass: number = Number(mass.value);
  const nA: number = Number(A.value);
  let nB: number = Number(B.value);
  if(!nMass || !nA || !nB) {
    alert("Please make sure there is a valid number inputed into the mass, A, and B.");
    return;
  }
  rocket.setValues(nA, nB, nMass);
  simulation.start();
});

restart.addEventListener('click', (e: MouseEvent) => {
  location.replace(location.href);
});

AirResToggle.addEventListener('click', (e: MouseEvent) => {
  state.air_resistance = !state.air_resistance;
  simulation.drawToggle(state.air_resistance, state.parachute);
});

ParchuteToggle.addEventListener('click', (e: MouseEvent) => {
  state.parachute = !state.parachute;
  simulation.drawToggle(state.air_resistance, state.parachute);
});

SimulationToggle.addEventListener('click', (e: MouseEvent) => {
  // Render Simulation
  if(document.getElementById('simulation') ) {
    console.log(document.getElementById('simulation'));
    return;
  }
  else {
    const child: Node = document.getElementById('graph');
    const parent: Node = child.parentNode;
    parent.removeChild(child);
    const sim: HTMLCanvasElement = document.createElement('canvas');
    sim.id = 'simulation';
    sim.className = 'w-100';
    sim.style.backgroundColor = 'black';
    parent.appendChild(sim);
    simulation.resetCanvas();
    simulation.init();
  }
});

GraphToggle.addEventListener('click', (e: MouseEvent) => {
  if(document.getElementById('graph')) {
    console.log(document.getElementById('graph'));
    return;
  }
  else {
    const child: Node = document.getElementById('simulation');
    let parent: Node = child.parentNode;
    parent.removeChild(child);
    const graph: HTMLCanvasElement = document.createElement('canvas');
    graph.id = 'graph';
    graph.className = 'w-100';
    graph.style.backgroundColor = 'blue';
    parent.appendChild(graph);
    const parentEl: HTMLElement = graph.parentElement;
    const buttons: string = `<div class="btn-group mb-3" id="graph_toggle_buttons">
      <button class="btn btn-primary active" id="position_toggle">Position Mode</button>
      <button class="btn btn-primary" id="velocity_toggle">Velocity Mode</button>
      <button class="btn btn-primary" id="acceleration_toggle">Acceleration Mode</button>
      </div>`;
    parentEl.insertAdjacentHTML('beforeend', buttons);

  }
});