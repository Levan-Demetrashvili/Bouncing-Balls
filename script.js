'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;
const BALLS_NUM = 50;
const gravity = 0.99;

const balls = [];

function genRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const alpha = Math.random().toFixed(2);

  const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  return color;
}

// Create Ball Class
class Ball {
  radius = Math.random() * 20 + 14;
  initialRadius = this.radius;
  x = Math.trunc(Math.random() * (width - this.radius * 2) + this.radius);
  y = Math.trunc(Math.random() * (height - this.radius));
  dx = Math.trunc(Math.random() * 2);
  dy = Math.trunc(Math.random() * 5);
  color = genRandomColor();
  acc = Math.random() / 5;
  create() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

// Add balls
for (let i = 0; i < BALLS_NUM; i++) {
  balls.push(new Ball());
}

// On mouse move
let mouseX, mouseY;
canvas.addEventListener('mousemove', function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  requestAnimationFrame(animate);

  if (canvas.width !== window.innerWidth || canvas.width !== window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].create();
    balls[i].x += balls[i].dx;
    balls[i].y += balls[i].dy;

    if (balls[i].radius + balls[i].x > width || balls[i].x - balls[i].radius < 0) {
      balls[i].dx = -balls[i].dx;
    }

    if (balls[i].y + balls[i].radius > height) balls[i].dy = -balls[i].dy * gravity;
    else balls[i].dy += balls[i].acc;

    // If mouse collides ball
    const dx = mouseX - balls[i].x;
    const dy = mouseY - balls[i].y;
    const distanceSquared = dx * dx + dy * dy;

    if (distanceSquared <= balls[i].radius ** 2 && balls[i].radius < 70) balls[i].radius += 5;
    else if (balls[i].radius > balls[i].initialRadius) balls[i].radius -= 5;
  }
}

animate();

setInterval(() => {
  balls.push(new Ball());
  balls.splice(0, 1);
}, 400);
