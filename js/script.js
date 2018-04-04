var canvas = document.querySelector('.first-canvas');
var ctx = canvas.getContext('2d');

// var for the game

var test = false;

var score = 0;
var level = 1;
var food = null;
var snake = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  speed: 3,
  dir: 'stop',
  snakeSize: 20,
  drawMe: function() {
    ctx.fillRect(this.x, this.y, this.snakeSize, 20), (ctx.fillStyle =
      'green'), ctx.fill();
  },
  eraseMe: function() {
    ctx.clearRect(this.x, this.y, 20, 20);
  },
};

// Function Init Game

// Function Collision

function getTop(obj) {
  return obj.y;
}
function getBottom(obj) {
  return obj.y + obj.height;
}
function getLeft(obj) {
  return obj.x;
}
function getRight(obj) {
  return obj.x + obj.width;
}

function collision(objA, objB) {
  return (
    getBottom(objA) >= getTop(objB) &&
    getTop(objA) <= getBottom(objB) &&
    getRight(objA) >= getLeft(objB) &&
    getLeft(objA) <= getRight(objB)
  );
}

// Draw food

var foodImage = new Image();
foodImage.src = './img/burger.png';

function createFood(x, y) {
  return {
    x: x,
    y: y,
    drawFood: function() {
      ctx.drawImage(foodImage, this.x, this.y, 50, 50);
    },
    clearFood: function() {
      // console.log('this is the function supposed to clear food');
      ctx.clearRect(this.x, this.y, 50, 50);
    },
  };
}

// Draw Snake and moving

function updateStuff() {
  // console.log('updatestuff is working');
  snake.eraseMe();

  // Snake goes back from the wall - inside updateStuff()

  if (snake.x >= canvas.width) {
    snake.x = 0;
  } else if (snake.x <= 0) {
    snake.x = canvas.width;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  } else if (snake.y <= 0) {
    snake.y = canvas.height;
  }

  // Snake turns - inside updateStuff()

  switch (snake.dir) {
    case 'right':
      snake.x += snake.speed;
      break;
    case 'left':
      snake.x -= snake.speed;
      break;
    case 'up':
      snake.y -= snake.speed;
      break;
    case 'down':
      snake.y += snake.speed;
      break;
    case 'stop':
      snake.x = snake.x;
      snake.y = snake.y;
      break;
  }

  snake.drawMe();

  if (food === null) {
    food = createFood(
      Math.floor(Math.random() * canvas.width),
      Math.floor(Math.random() * canvas.height)
    );
  }

  food.drawFood();

  // Level Up
  // if ((level += 1)) {
  //   snake.speed += 4;
  // }

  // Snakes grows
  if (test) {
    snake.snakeSize += 50;
  }

  function foodCollision() {
    var hasCollided = false;
    if (collision(snakeImage, foodImage)) {
      hasCollided = true;
      food.clearFood();
      food = null;
    }
    return hasCollided;
  }

  requestAnimationFrame(function() {
    updateStuff();
  });
}

updateStuff();

// Snake moves

$('body').keydown(function() {
  switch (event.keyCode) {
    case 39:
      if (snake.dir !== 'left') {
        snake.dir = 'right';
        break;
      }

    case 37:
      if (snake.dir !== 'right') {
        snake.dir = 'left';
        break;
      }

    case 40:
      if (snake.dir !== 'up') {
        snake.dir = 'down';
        break;
      }

    case 38:
      if (snake.dir !== 'down') {
        snake.dir = 'up';
        break;
      }

    case 32:
      snake.dir = 'stop';
      break;

    case 49:
      test = !test;
      break;
  }
});
