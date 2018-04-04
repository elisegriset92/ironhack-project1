var canvas = document.querySelector('.first-canvas');
var ctx = canvas.getContext('2d');

// _____________________________________Init Game____________________________________//

function initGame() {
  $('.btn').off();
  $('.btn').removeClass('btn-success');
  $('.btn').addClass('btn-clicked');
  $('.btn').text('Good Luck!');

  // ____var for the game_____//

  var score = 0;
  var level = 1;
  var food = null;

  var snake = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 3,
    dir: 'right',
    snakeSize: 20,
    width: 20,
    height: 20,
    drawMe: function() {
      if (this.dir === 'down') {
        ctx.fillRect(
          this.x + this.width,
          this.y,
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
    // eraseMe: function() {
    //   if (this.dir === 'down') {
    //     ctx.clearRect(this.x + this.width, this.y, this.height, this.width);
    //   } else if (this.dir === 'up') {
    //     ctx.clearRect(
    //       this.x + this.height,
    //       this.y + this.height,
    //       this.height,
    //       this.width
    //     );
    //   } else if (this.dir === 'left') {
    //     ctx.clearRect(
    //       this.x + this.height,
    //       this.y + this.width,
    //       this.width,
    //       this.height
    //     );
    //   } else {
    //     ctx.clearRect(this.x, this.y, this.width, this.height);
    //   }
    // },
  };

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
    if (collision(snake, food)) {
      hasCollided = true;
    }
    return hasCollided;
  }

  // ______________________________________UPDATE STUFF___________________________________________//

  function updateStuff() {
    // snake.eraseMe();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // _______Snake goes back from the wall - inside updateStuff()______//
    if (snake.x >= canvas.width) {
      snake.x = 0;
    } else if (snake.x <= 0) {
      snake.x = canvas.width;
    } else if (snake.y >= canvas.height) {
      snake.y = 0;
    } else if (snake.y <= 0) {
      snake.y = canvas.height;
    }

    // ______Snake turns - inside updateStuff()_____//

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

    // ____Draw Food is called_____//

    if (food === null) {
      food = createFood(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height)
      );
    }
    food.drawFood();

    // ______Level Up_______//

    // function levelUp() {
    //   if ((level += 1)) {
    //     snake.speed += 4;
    //   }
    // }

    if (foodCollision()) {
      food.clearFood();
      food = null;
      snake.width += 50;
      score += 1;
      console.log(score);
    }

    // ______Score_______//

    function getScore() {
      return score;
    }
    getScore();

    requestAnimationFrame(function() {
      updateStuff();
    });
  }
  updateStuff();

  // ______Keyboard cases_______//

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
}
