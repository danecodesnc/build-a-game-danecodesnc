//Notes from Clinton for Space Invaders

//Creating class to grab entire document and start creating game.
class Game {
    constructor() {

    }
}

//Creating the canvas that will contain the game.
let canvas = document.getElementById('space-invaders')

//Make all content on screen 2 dimensional
let screen = canvas.getContext('2d')

//Defining the size and dimenstions of the game
let gameSize = {
    x: canvas.clientWidth,
    y: canvas.height
}

//Creating the array that everything will appear in, including bodies, characters, bullets and so on.
this.bodies = []

//Creating the invaders themselves and putting them into the bodies array
this.bodies = this.bodies.concat(createinvaders(this))

//This adds palyer to the array bodies. At this point we have added invaders and character into the array bodies.
this bodies = this.bodies.concat(new Player(this, gameSize))

//Creating audio for the game.
this.shootSound = document.getElementById('shoot-sound')

//This will create a tick function, whatever that is, and this will loop forever at 60FPS per-second. I assume this makes the game functional and characters able to move within the frame of the browser at a certain framerate that you call your graphics card and processor to run.
let tick = ( => {})