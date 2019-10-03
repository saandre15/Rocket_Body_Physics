import {  Simulation, Rocket } from "./simulation";

const start: HTMLButtonElement = document.getElementById('start') as HTMLButtonElement;
const restart: HTMLButtonElement = document.getElementById('restart') as HTMLButtonElement;
const mass: HTMLInputElement = document.getElementById('mass') as HTMLInputElement;
const A: HTMLInputElement = document.getElementById('a') as HTMLInputElement;
const B: HTMLInputElement = document.getElementById('b') as HTMLInputElement;
const AirResToggle: HTMLButtonElement = document.getElementById('air_resistance') as HTMLButtonElement;
const ParchuteToggle: HTMLButtonElement = document.getElementById('parachute') as HTMLButtonElement;

const state = {
  simulation: false,
  air_resistance: false,
  parachute: false,
}

const rocket = new Rocket(0, 0);
const simulation = new Simulation([rocket]);
simulation.init();

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
