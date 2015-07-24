// Enemies our player must avoid
var Enemy = function(x, row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = (x *-1) - 101; 
    this.y = (row * 83) - 20; 
    this.speed = speed; 
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var moveSpeed = this.speed * dt;
    this.x += moveSpeed; 

    var xBound = 505;
    var restartPos = -120;  
    if(this.x > xBound){
        this.x = restartPos; 
    } 

    // collision with player
    
    
    if(Math.round((this.y / 82)) === Math.round(player.y / 82) &&
       Math.round((this.x / 101)) === Math.round(player.x / 101)){
        var moveX = 101; 
        var moveY = 83;
        player.x = 2 * moveX; 
        player.y = (5 * moveY) - 5;  
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var moveX = 101; 
    var moveY = 82; 
    this.updateX = 0; 
    this.updateY = 0; 
    this.x = 2 * moveX; 
    this.y = (5 * moveY) - 5;  
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
}

// This class requires an update(),
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    if(this.y < 0){
        var moveX = 101; 
        var moveY = 82; 
        this.x = 2 * moveX; 
        this.y = (5 * moveY) - 5;  
    }
    else {
        this.x += this.updateX; 
        this.y += this.updateY;
    } 
    this.updateX = 0; 
    this.updateY = 0;
}

// j the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// a handleInput() method.
Player.prototype.handleInput = function(key){
    var moveX = 101; 
    var moveY = 83;
    var topLeftBound = 0; 
    var bottomRightBound = 380;

    switch(key){
        case "up":
            if(this.y > topLeftBound){
                this.updateY = -1 * moveY; 
            }
            break; 
        case "down":
            if(this.y < bottomRightBound){
                this.updateY = moveY; 
            }
            break; 
        case "left":
            if(this.x > topLeftBound){
                this.updateX = -1 * moveX; 
            }
            break; 
        case "right":
            if(this.x < bottomRightBound){
                this.updateX = moveX; 
            }
            break; 
    }
} 


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(300, 1, 50); 
var enemy2 = new Enemy(100, 2, 400); 
var enemy3 = new Enemy(200,3, 300); 
var enemy4 = new Enemy(0, 1, 300); 


var allEnemies = []; 
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);

var player = new Player(3, 3); 


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
