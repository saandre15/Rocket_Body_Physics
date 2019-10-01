import { Rocket, Simulation } from "./simulation";

const start: HTMLElement = document.getElementById('start');
const end: HTMLElement= document.getElementById('end');

const state = {
  simulation: false
}

start.addEventListener('click', () => {
  const A: string = (document.getElementById('A') as HTMLFormElement).value;
  const B: string =(document.getElementById('B') as HTMLFormElement).value;
  const ANum: number = Number(A);
  const BNum: number = Number(B);
  main();
});

function main(A: number, B: number) {
  const sprite = new Image(15, 20);
  sprite.src = "localhost/sprites/sprite.png";
  const rocket = new Rocket(sprite, 12, 3, 5);
  const simulation = new Simulation(rocket);
  simulation.draw();
}