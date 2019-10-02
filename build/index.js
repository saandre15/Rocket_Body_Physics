import { Rocket, Simulation } from "./simulation";
var start = document.getElementById('start');
var end = document.getElementById('end');
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
start.addEventListener('click', function () {
    simulation.start();
});
function main(A, B, mass) {
    simulation.setRocketValues(A, B, mass);
    simulation.draw();
}
