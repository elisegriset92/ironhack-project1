var canvas = document.querySelector('.first-canvas');
var ctx = canvas.getContext('2d');

// _____________________________________Init Game____________________________________//

function initGame() {
  $('.btn').off();
  $('.btn').removeClass('btn-success');
  $('.btn').addClass('btn-clicked');
  $('.btn').text('Good Luck!');

  // ____var for the game_____//

  var food = null;

  var snake = [];
  var snakeBody = {
    x: 12,
    y: 13,
    width: 20,
    height: 20,
    drawBody: function() {
      ctx.fillRect(this.x, this.y, this.width, this.height), (ctx.fillStyle =
        'red'), ctx.fill();
    },
  };
  var snakeHead = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 3,
    score: 0,
    level: 1,
    dir: 'right',
    width: 20,
    height: 20,
    drawMe: function() {
      if (this.dir === 'down') {
        ctx.fillRect(
          this.x + this.width - this.height,
          this.y - this.width + this.height,
          this.height,
          this.width
        ), (ctx.fillStyle = 'green'), ctx.fill();
      } else if (this.dir === 'up') {
        ctx.fillRect(
          this.x + this.height,
          this.y + this.height,
          this.height,
          this.width
        ), (ctx.fillStyle = 'green'), ctx.fill();
      } else if (this.dir === 'left') {
        ctx.fillRect(
          this.x + this.height,
          this.y + this.width,
          this.width,
          this.height
        ), (ctx.fillStyle = 'green'), ctx.fill();
      } else {
        ctx.fillRect(this.x, this.y, this.width, this.height), (ctx.fillStyle =
          'green'), ctx.fill();
      }
    },
  };

  snake.push(snakeHead);
  console.log(snake);

  // ____Draw Food_____//

  var foodImage = new Image();
  foodImage.src = './img/burger.png';

  function createFood(x, y) {
    return {
      x: x,
      y: y,
      width: 50,
      height: 50,
      drawFood: function() {
        ctx.drawImage(foodImage, this.x, this.y, this.width, this.height);
      },
      clearFood: function() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
      },
    };
  }

  // ____Collision_____//

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
    if (collision(snakeHead, food)) {
      hasCollided = true;
    }
    return hasCollided;
  }

  // ______________________________________UPDATE STUFF___________________________________________//

  function updateStuff() {
    // snake.eraseMe();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // _______Snake goes back from the wall - inside updateStuff()______//
    if (snakeHead.x >= canvas.width) {
      snakeHead.x = 0;
    } else if (snakeHead.x <= 0) {
      snakeHead.x = canvas.width;
    } else if (snakeHead.y >= canvas.height) {
      snakeHead.y = 0;
    } else if (snakeHead.y <= 0) {
      snakeHead.y = canvas.height;
    }

    // ______Snake turns - inside updateStuff()_____//

    switch (snakeHead.dir) {
      case 'right':
        snakeHead.x += snakeHead.speed;
        break;
      case 'left':
        snakeHead.x -= snakeHead.speed;
        break;
      case 'up':
        snakeHead.y -= snakeHead.speed;
        break;
      case 'down':
        snakeHead.y += snakeHead.speed;
        break;
      case 'stop':
        snakeHead.x = snakeHead.x;
        snakeHead.y = snakeHead.y;
        break;
    }
    snakeHead.drawMe();

    // ____Draw Food is called_____//

    if (food === null) {
      food = createFood(
        Math.floor(Math.random() * (canvas.width - 20)),
        Math.floor(Math.random() * (canvas.height - 20))
      );
    }
    food.drawFood();

    if (foodCollision()) {
      food.clearFood();
      food = null;
      snake.push(snakeBody);
      snakeHead.score += 1;
      $('.score').text(snakeHead.score + ' PTS');
      if (snakeHead.score === 2) {
        snakeHead.level += 1;
        snakeHead.speed += 2;
        console.log(snakeHead.speed);
        $('.level').text('LEVEL ' + snakeHead.level);
      }
    }

    // ______Level Up_______//

    // if (snakeHead.score === 2) {
    //   snakeHead.level += 1;
    //   snakeHead.speed += 2;
    //   console.log(snakeHead.speed);
    //   $('.level').text('LEVEL ' + snakeHead.level);
    // }

    requestAnimationFrame(function() {
      updateStuff();
    });
  }
  updateStuff();

  // ______Keyboard cases_______//

  $('body').keydown(function() {
    switch (event.keyCode) {
      case 39:
        if (snakeHead.dir !== 'left') {
          snakeHead.dir = 'right';
          break;
        }

      case 37:
        if (snakeHead.dir !== 'right') {
          snakeHead.dir = 'left';
          break;
        }

      case 40:
        if (snakeHead.dir !== 'up') {
          snakeHead.dir = 'down';
          break;
        }

      case 38:
        if (snakeHead.dir !== 'down') {
          snakeHead.dir = 'up';
          break;
        }

      case 32:
        snakeHead.dir = 'stop';
        break;

      case 49:
        test = !test;
        break;
    }
  });
}
