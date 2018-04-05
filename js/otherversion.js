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
  // ____Draw Food__TACO___//

  var foodImage1 = new Image();
  foodImage1.src = './img/taco.png';

  function createTaco(x, y) {
    return {
      x: x,
      y: y,
      width: 80,
      height: 80,
      drawFood: function() {
        ctx.drawImage(foodImage1, this.x, this.y, this.width, this.height);
      },
      clearFood: function() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
      },
    };
  }

  // ____Draw Food__LOBSTER___//

  var foodImage2 = new Image();
  foodImage2.src = './img/lobster.png';

  function createLobster(x, y) {
    return {
      x: x,
      y: y,
      width: 50,
      height: 50,
      drawFood: function() {
        ctx.drawImage(foodImage2, this.x, this.y, this.width, this.height);
      },
      clearFood: function() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
      },
    };
  }

  // ____Draw Food__BURGER___//

  var foodImage3 = new Image();
  foodImage3.src = './img/burger.png';

  function createBurger(x, y) {
    return {
      x: x,
      y: y,
      width: 50,
      height: 50,
      drawFood: function() {
        ctx.drawImage(foodImage3, this.x, this.y, this.width, this.height);
      },
      clearFood: function() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
      },
    };
  }

  // ____Draw Food__PIZZA___//

  var foodImage4 = new Image();
  foodImage4.src = './img/pizza.png';

  function createPizza(x, y) {
    return {
      x: x,
      y: y,
      width: 300,
      height: 300,
      drawFood: function() {
        ctx.drawImage(foodImage4, this.x, this.y, this.width, this.height);
      },
      clearFood: function() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
      },
    };
  }

  // ____Draw Walls___If time, create a function for this__//

  var wall_1 = {
    x: 0,
    y: 0,
    width: 25,
    height: canvas.width,
    drawWalls: function() {
      ctx.fillRect(this.x, this.y, this.width, this.height), (ctx.fillStyle =
        'red'), ctx.fill();
    },
  };

  var wall_2 = {
    x: 0,
    y: canvas.width,
    width: 25,
    height: canvas.height,
    drawWalls: function() {
      ctx.fillRect(this.x, this.y, this.width, this.height), (ctx.fillStyle =
        'red'), ctx.fill();
    },
  };

  var wall_3 = {
    x: 0,
    y: 0,
    width: 25,
    height: canvas.width,
    drawWalls: function() {
      ctx.fillRect(this.x, this.y, this.width, this.height), (ctx.fillStyle =
        'red'), ctx.fill();
    },
  };

  var wall_4 = {
    x: 0,
    y: 0,
    width: 25,
    height: canvas.width,
    drawWalls: function() {
      ctx.fillRect(this.x, this.y, this.width, this.height), (ctx.fillStyle =
        'red'), ctx.fill();
    },
  };

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

  // __________Food Collision___________//

  function foodCollision() {
    var hasCollided = false;
    if (collision(snakeHead, food)) {
      hasCollided = true;
    }
    return hasCollided;
  }
  // __________Walls Collision___________//

  function wallCollision() {
    var hasCollided = false;
    if (
      collision(snakeHead, wall_1) ||
      collision(snakeHead, wall_2) ||
      collision(snakeHead, wall_3) ||
      collision(snakeHead, wall_4)
    ) {
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
      food = createTaco(
        Math.floor(Math.random() * (canvas.width - 20)),
        Math.floor(Math.random() * (canvas.height - 20))
      );
    }
    food.drawFood();

    if (foodCollision()) {
      food.clearFood();
      food = null;
      snakeHead.score += 1;
      $('.score').text(snakeHead.score + ' PTS');

      if (snakeHead.score === 5) {
        if (food === null) {
          food = createLobster(
            Math.floor(Math.random() * (canvas.width - 20)),
            Math.floor(Math.random() * (canvas.height - 20))
          );
        }
        food.drawFood();
        snakeHead.level += 1;
        snakeHead.speed += 2;
        $('.level').text('LEVEL ' + snakeHead.level);
        $('.first-canvas').addClass('background2');
      } else if (snakeHead.score === 10) {
        if (food === null) {
          food = createBurger(
            Math.floor(Math.random() * (canvas.width - 20)),
            Math.floor(Math.random() * (canvas.height - 20))
          );
        }
        food.drawFood();
        snakeHead.level += 1;
        snakeHead.speed += 2;
        $('.level').text('LEVEL ' + snakeHead.level);
        $('.first-canvas').addClass('background3');
      } else if (snakeHead.score === 15) {
        if (food === null) {
          food = createPizza(
            Math.floor(Math.random() * (canvas.width - 20)),
            Math.floor(Math.random() * (canvas.height - 20))
          );
        }
        food.drawFood();
        snakeHead.level += 1;
        snakeHead.speed += 2;
        $('.level').text('LEVEL ' + snakeHead.level);
        $('.first-canvas').addClass('background4');
      }
      // else {food.clearFood();
      // }
    }

    if (snakeHead.level === 2) {
      wall_1.drawWalls();
    }

    if (snakeHead.level === 3) {
      wall_1.drawWalls();
      wall_2.drawWalls();
    }

    if (snakeHead.level === 4) {
      wall_1.drawWalls();
      wall_2.drawWalls();
      wall_3.drawWalls();
      wall_4.drawWalls();
    }

    if (wallCollision()) {
      alert('Game over!');
      location.reload();
    }

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
