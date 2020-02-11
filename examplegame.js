//Example game Rebecca and Amy are making in class.
//They are laying out what needs to be made below.

//We have class responsibility collaborators.
//What are the classes we need. What will they do
//It's whatever other class we need to engage with to make the game function.


//The conditions below are considered Classes and next to them are responsibilities.

//Space - exists and defines edges. Know when the game ends.
//1. Player - moves left to right. Shoots. Keeps track of hits.
//1. Enemy - moves down know its starting position. Collidies with player.
//2. Projectile - move up from player, knows player's position.

//Collaborator

//Player
//Enemy projectile
//


//Game keeps track of score

//There's something they call a parking lot which gives extra information that they want to add later in the game. It also includes questions. The list is below.
//Powerups
//What is the spinning square??

//Successful first question for the game overall is can we get the player and the enemies to move the way we want them to move.

//We have to make sure that everything we see visually is done in the code. That is a must.



//Now the code.
//They are not starting with the canvas because they are not sure how to make this happen yet. They are just starting with code they know right now.
//They can make a game that has the classes and objects that it needs, that can do things without it being in the canvas. The canvas can come later. 



class Game {
    //This is an initializer, where the game begins. That's what the constructor will do.
    constructor() {
        this.score = 0
        this.player = new Player()
    }
}

class Player {
    constructor() {
        this.position: = {
            x: 0,
            y: 0
        }
    }
}

//Places to start here.
//Work in groups.