import { Rocket, Simulation } from "./simulation";

const start: HTMLElement = document.getElementById('start');
const mass: HTMLInputElement = document.getElementById('mass') as HTMLInputElement;
const A: HTMLInputElement = document.getElementById('a') as HTMLInputElement;
const B: HTMLInputElement = document.getElementById('b') as HTMLInputElement;

const state = {
  simulation: false
}

const rocketSprite = new Image(30, 30);
rocketSprite.src = "http://pngimg.com/uploads/rockets/rockets_PNG13291.png";
const rocket = new Rocket(rocketSprite);
const simulation = new Simulation(rocket, starSprite);
simulation.init();

start.addEventListener('click', (e: MouseEvent) => {
  e.preventDefault();
  const nMass: number = Number(mass.value);
  const nA: number = Number(A.value);
  let nB: number = Number(B.value);
  if(!nMass || !nA) {
    alert("Please make sure there is a valid number inputed into the mass, A, and B.");
    return;
  }
  if(!nB)
    nB = 0;
  (<HTMLButtonElement>document.getElementById('start')).disabled = true;
  simulation.setRocketValues(nA, nB, nMass);
  simulation.start();
});