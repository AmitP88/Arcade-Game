/*This file contains essential code for my Classic Arcade Game Clone project.
  The code in this file contains objects and functions that pertain to the enemy
  and player elements of the game.

    -Amit Patel, 5/24/2015*/

// Enemies our player must avoid. Paramaters: x-position, y-position,
// movement speed, initial enemy direction.
var Enemy = function (x, y, speed, direction) {
    this.x = x;
    this.y = y;
    this.speed = (Math.floor(Math.random()));
    this.direction = -1;

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
    this.sprite = 'images/RightEnemyBug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.move = function (dt) {
    if (this.direction === "left") {
        this.x = this.x - (dt * this.speed);
    } else if (this.direction === "right") {
        this.x = this.x + (dt * this.speed);
    }
};

// Movement by the dt parameter, which will ensure the game runs
// at the same speed for all computers.
Enemy.prototype.update = function (dt) {

    //var x = this.x;
    //
    //if (x > 800) {
    //    ((this.direction = 1) && (this.sprite = 'images/LeftEnemyBug.png'))
    //}
    //else if (x < 600) {
    //    ((this.direction = -1) && (this.sprite = 'images/RightEnemyBug.png'))
    //}

    this.x = this.x + (this.speed * dt * this.direction);

    this.randomSpeed()
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to randomize enemy movements' speed
Enemy.prototype.randomSpeed = function () {
    this.speed = (Math.floor(Math.random() * -230));
};

// Player movement, initial location upon game load,
// sprite image, and previous location (used for handleInput).
// Parameter: player's x-position and y-position
var Player = function (x, y) {
    this.x = 400;
    this.y = 800;
    this.sprite = 'images/Character Boy.png';
    this.previousLocation = {x: this.x, y: this.y};
};

// Updates the player's location
Player.prototype.update = function () {

};

// Renders the player's character image and location on the level map
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles the input from the keystrokes of the player.
// Paramater: Player's direction of keystroke
Player.prototype.handleInput = function (direction) {
    this.previousLocation.x = this.x;
    this.previousLocation.y = this.y;

    if (direction === 'left' && this.x > 100) {
        this.x -= 100;
    }
    if (direction === 'up' && this.y > 100) {
        this.y -= 80;
    }
    if (direction === 'right' && this.x > -100 && this.x < 800) {
        this.x += 100;
    }
    if (direction === 'down' && this.y > 0 && this.y < 750) {
        this.y += 80;
    }
};

// Instantiated player and enemy objects.
// Instantiated enemy objects include initial positions upon
// game load.

var player = new Player();
var allEnemies = [
    new Enemy(600, 650),
    new Enemy(300, 560),
    new Enemy(500, 490),
    new Enemy(500, 250)
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});