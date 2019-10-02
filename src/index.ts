import { Rocket, Simulation } from "./simulation";

const start: HTMLElement = document.getElementById('start');
const end: HTMLElement= document.getElementById('end');

const state = {
  simulation: false
}

const starSprite = new Image(10, 10);
starSprite.src = "https://clipart.info/images/ccovers/1531014986Gold-Star-Transparent-PNG-Clip-Art.png";
const rocketSprite = new Image(30, 30);
rocketSprite.src = "http://pngimg.com/uploads/rockets/rockets_PNG13291.png";
const rocket = new Rocket(rocketSprite);
const simulation = new Simulation(rocket, starSprite);
simulation.init();

start.addEventListener('click', () => {
  simulation.start();
});

function main(A: number, B: number, mass: number) {
  simulation.setRocketValues(A, B, mass);
  simulation.draw();
}