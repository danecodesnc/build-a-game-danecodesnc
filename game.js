// Creating class to grab entire document and start creating game.
class Game {
    constructor() {
        // Creating the canvas that will contain the game.
        const canvas = document.getElementById('space-invaders')

        // Make all content on screen 2 dimensional
        const screen = canvas.getContext('2d')

        // Defining the size and dimenstions of the game
        const gameSize = {
            x: canvas.width,
            y: canvas.height
        }

        // Creating the array that everything will appear in, including bodies, characters, bullets and so on.
        this.bodies = []

        // Creating the invaders themselves and putting them into the bodies array
        this.bodies = this.bodies.concat(createInvaders(this))

        // Creating the invaders themselves and putting them into the bodies array
        this.bodies = this.bodies.concat(new Player(this, gameSize))

        // This adds player to the array bodies. At this point we have added invaders and character into the array bodies.
        // The audio tag is defined in the index.html file
        this.shootSound = document.getElementById('shoot-sound')

        // This will create a tick function, whatever that is, and this will loop forever at 60 ticks per-second. I assume this makes the game functional and characters able to move within the frame of the browser at a certain framerate that you call your graphics card and processor to run.
        // The tick function will call the update, draw, and request animtion ...
        // Update will call the game logic
        const tick = () => {
            // Now we will update the game.
            this.update()

            // Creating the game characters or draw them.
            this.draw(screen, gameSize)

            // Creating frames for the characters to move in ticks?
            requestAnimationFrame(tick)
        }

        // This helps create the first game tick, the tick is the movement of the character on the screen.
        tick()
    }

    // This will run the game logic, not exactly sure what logic is. Will ask about that.
    update() {
        // `notCollidingWithAnything` returns true if passed body?
        // is not colliding with anything?
        const notCollidingWithAnything = (b1) => {
            return this.bodies.filter(function(b2) {
                return colliding(b1, b2)
            }).length === 0
        }

        // This will make sure characters that hit or collide with something are not drawn again and updated.
        this.bodies = this.bodies.filter(notCollidingWithAnything)

        // This will call update every body in the game.
        // Basically it's calling all body elements in the game to update?
        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].update()
        }
    }

    // Now let's draw the game by using draw() below
    draw(screen, gameSize) {
        // Clear away the drawing from the previous tick.
        screen.clearRect(0, 0, gameSize.x, gameSize.y)

        // Drawing everything as a rectangle to get something on the screen.
        for (let i = 0; i < this.bodies.length; i++) {
            drawRect(screen, this.bodies[i])
        }
    }

    // This is creating conditions that invaderBelow returns true if `invader` is directly
    // above another row of invaders.
    invadersBelow(invader) {
        // If filtered array (not quite sure what filters means) is not empty, there are invaders below.
        // Maybe this means that there's more than one row of enemies.
        return this.bodies.filter(function(b) {
            // This is written as keep `b` if it is an invader, if it is in teh same column
            // as `invader`, and if it is somewhere below `invader`.
            // This is the player character from what I am assuming here.
            return b instanceof Invader &&
                Math.abs(invader.center.x - b.center.x) < b.size.x &&
                b.center.y > invader.center.y
        }).length > 0
    }

    // addBody() adds a body to the bodies array.
    // I assume this adds more enemies and/or bullets to the game?
    addBody(body) {
        this.bodies.push(body)
    }
}

// Creating Invaders for game
class Invader {
    constructor(game, center) {
        this.game = game
        this.center = center
        this.size = {
            x: 20,
            y: 20
        }

        // We are now going to create the way the invaders move in the game.
        // According to Clinton, the characters will move left to right.
        // this, controls the movement of the invaders.
        this.patrolX = 0

        // We are going to define the speed and rate the invaders move here.
        // Right will be a positive value
        // Left will be a negative value.
        this.speedX = 1
    }

    // We are going to update the state of the invader for a single tick below.
    update() {
        // This statement below will create a condition if the invader is outside the bounds of their patrol.
        if (this.patrolX < 0 || this.patrolX > 550) {
            // This will reverse direction of the movement.
            this.speedX = -this.speedX
        }


        // This is a random math function that is stated in the directions like this "If coin flip comes up and no friends below in this invader's column.
        if (Math.random() > 0.995 &&
            !this.game.invadersBelow(this)) {
            // Creating a bullet that will move below the invader and in a downward direction.
            const bullet = new Bullet({
                x: this.center.x,
                y: this.center.y + this.size.y / 2
            }, {
                x: Math.random() - 0.5,
                y: 2
            })

            // This is creating a bullet for the game
            this.game.addBody(bullet)
        }

        // This will indicate the speed at which the enemies move.
        this.center.x += this.speedX

        // Guessing here. This keeps the invaders in their patrol positions?
        this.patrolX += this.speedX
    }
}

// This will return an array of 24 invaders in the function below.
function createInvaders(game) {
    const invaders = []
    for (let i = 0; i < 24; i++) {
        // This creates three separate rows for the invaders to operate in.
        const x = 30 + (i % 8) * 30

        // Place invaders in three rows.
        const y = 30 + (i % 3) * 30


        // Create an invader.
        invaders.push(new Invader(game, {
            x: x,
            y: y
        }))
    }

    return invaders
}

// Player
// ------

// Let's create the player.

class Player {
    constructor(game, gameSize) {
        this.game = game
        this.size = {
            x: 40,
            y: 40
        }
        this.center = {
            x: gameSize.x / 2,
            y: gameSize.y - this.size.y * 2
        }

        // Create a keyboard object to track button presses.
        this.keyboarder = new Keyboarder()
    }

    update() {
        // This will enable the functionality of the left keyboard key to move the character.
        if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
            // Move the character left.
            this.center.x -= 8
                // We write an else if statement talking about if the right keyboard key is pressed down to move the character.
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
            this.center.x += 8
        }

        // When the S key is pressed down on the keyboard.
        if (this.keyboarder.isDown(this.keyboarder.KEYS.S)) {
            // Creating a bullet that will emit from the player. This will move upwards toward the enemies on the screen.
            const bullet = new Bullet({
                x: this.center.x,
                y: this.center.y - this.size.y - 20
            }, {
                x: 0,
                y: -4
            })

            // add the bullet to the game
            this.game.addBody(bullet)


            // adds the shooting sound to the character when the bullet propels out of the character.
            this.game.shootSound.load()

            // this.game.shootSound.play()
            this.game.shootSound.play()
        }
    }

}


// Bullet for the Character.

// Creating a new bullet.

class Bullet {
    constructor(center, velocity) {
        this.center = center
        this.size = {
            x: 3,
            y: 3
        }
        this.velocity = velocity
    }

    update() {
        //Add the veolcity to the bullet.
        this.center.x += this.velocity.x
        this.center.y += this.velocity.y
    }
}

// Creating the inputs of the keyboarder/keyboard.

// Now we will create the functionality of the keyboard on the game. I assume this will help move the character on the screen.

class Keyboarder {
    constructor() {
        // This will create teh up and down movements of the character using the up and down keys?
        const keyState = {}

        //Don='t understand why the event keyCode is in an array.
        window.addEventListener('keydown', function(e) {
            keyState[e.keyCode] = true
        })

        //This recordes when the key is no longer being pressed to move the character.

        window.addEventListener('keyup', function(e) {
            keyState[e.keyCode] = false
        })

        window.addEventListener('keydown', function(e) {
            keyState[e.keyCode] = true
        })


        //When the down key is pressed. 
        this.isDown = function(keyCode) {
            return keyState[keyCode] === true
        }



        //This defines the actual keys being used on the keyboard.
        this.KEYS = {
            LEFT: 37,
            RIGHT: 39,
            S: 83
        }
    }

}


//This draws entire canvas upon every tick on the screen?
function drawRect(screen, body) {
    screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
        body.size.x, body.size.y)
}

//This is a function that is called colliding. This will define when the bullets collide with bodies/enemeies on the screen.
//According to Clinton's file, this has five different situations defined under the function.
//It's saying if any are true, then the bodies are definately not colliding.
//If none of them are true, the bodies are colliding.
//Some of the code I do not understand below that statement above. I believe that it's giving the 5 different conditions that could happen.

// 1. b1 is the same body as b2.
// 2. Right of `b1` is to the left of the left of `b2`.
// 3. Bottom of `b1` is above the top of `b2`.
// 4. Left of `b1` is to the right of the right of `b2`.
// 5. Top of `b1` is below the bottom of `b2`.
function colliding(b1, b2) {
    return !(
        b1 === b2 ||
        b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
        b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
        b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
    )
}

//When the DOM is ready to globalThis, create and start the game.

window.addEventListener('load', function() {
    new Game()
})