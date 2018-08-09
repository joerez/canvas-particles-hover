const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
//
// c.fillStyle = 'rgba(255,0,20,.6)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(255,120,20,.6)';
// c.fillRect(200, 300, 100, 100);
// c.fillStyle = 'rgba(15,70,200,.8)';
// c.fillRect(300, 140, 200, 100);
//
// //line
//
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#04fa00";
// c.stroke();

// //arc /cricle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'green';
// c.stroke();
//
// for (let i = 0; i < 3; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = 'green';
//   c.stroke();
// }


var mouse = {
  x: undefined,
  y: undefined
}

let maxRadius = 40;
// let minRadius = 2;

let colorArray = [
  '#2980b9',
  '#e74c3c',
  '#1abc9c',
  '#2c3e50',
  '#9b59b6',
  '#ecf0f1',
  '#f1c40f',
  '#27ae60',
  '#7f8c8d',
  '#fff'
]

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('resize', function(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius
  this.minRadius = radius
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false
        );
    c.strokeStyle = 'blue';
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = - this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }


    this.draw();
  }
}

var circleArray = [];


function init() {
  circleArray = [];
  for (let i = 0; i < 800; i ++) {
    let radius = Math.random() * 3 + 1;

    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() -0.5);

    circleArray.push(new Circle(x, y, dx, dy, radius))
  }

}

init();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight
      );

      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
      }

}

animate();
