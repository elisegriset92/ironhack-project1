var canvas = document.querySelector('.first-canvas');
var ctx = canvas.getContext('2d');

// Food collision

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

function foodCollision() {
  var hasCollided = false;
  if (collision(snake, food)) {
    hasCollided = true;
  }
  return hasCollided;
}

// Draw Snake & Walls

var snakeImage = new Image();
snakeImage.src = './img/snake1.png';

var snake = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  speed: 3,
  dir: 'right',
  drawMe: function() {
    // ctx.drawImage(snakeImage, this.x, this.y, 100, 100);
    ctx.fillRect(this.x, this.y, 20, 20), (ctx.fillStyle = 'green'), ctx.fill();
    // ctx.fillRect(0, 0, 10, 800), (ctx.fillStyle = 'green'), ctx.fill();
  },
  eraseMe: function() {
    ctx.clearRect(this.x, this.y, 20, 20);
  },
};
// Draw food

var foodImage = new Image();
foodImage.src = './img/burger.png';

function createFood(x, y) {
  return {
    x: x,
    y: y,
    drawFood: function() {
      console.log('drawfood called');
      ctx.drawImage(foodImage, this.x, this.y, 50, 50);
    },
    eraseFood: function() {
      ctx.clearRect(this.x, this.y, 50, 50);
    },
  };
}

var food = null;

function updateStuff() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.eraseMe();

  // Snake goes back from the wall

  if (snake.x >= canvas.width) {
    snake.x = 0;
  } else if (snake.x <= 0) {
    snake.x = canvas.width;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  } else if (snake.y <= 0) {
    snake.y = canvas.height;
  }

  // Snake turns;

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
    console.log('after collision');
    food = createFood(
      Math.floor(Math.random() * canvas.width),
      Math.floor(Math.random() * canvas.height)
    );
    food.drawFood();
  }

  if (Math.random() * 0.9) {
    console.log('collision');
    food.eraseFood();
    food = null;
  }

  requestAnimationFrame(function() {
    updateStuff();
  });
}

snake.onload = updateStuff();

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
  }
});
