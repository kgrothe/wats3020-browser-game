/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

class Player {
    constructor(token){
        this.token = token;
    }
}

// Tic Tac Toe Game Class

class TicTacToe {
    constructor(){
        // TODO: Set up `this.player1` and `this.player2` properties.
        // These properties should be new Player class instances.
        // You may set the "token" to anything that corresponds to a Glyphicon
        // icon name ('heart', 'star', 'remove-sign', 'unchecked', 'bell',
        // 'certificate', etc.)


this.player1 = new Player('heart');
this.player2 = new Player('star');

        // TODO: Initialize several  properties that will be used to track game
        // progress.       

this.currentPlayer = null;
        
this.gameStatus = null;
        
this.winner = null;

this.moveCount = 0;

        // TODO: Set up DOM elements used in game as Class properties

        // TODO: Set `this.startPrompt` equal to the `#start-prompt` element
        
this.startPrompt = document.querySelector('#start-prompt');
        // TODO: Set `this.movePrompt` equal to the `#move-prompt` element
this.movePrompt = document.querySelector('#move-prompt');
        // TODO: Set `this.currentPlayerToken` equal to the `#player-token` element
this.currentPlayerToken = document.querySelector('#player-token');
        // TODO: Set `this.gameboard` equal to the `#gameboard` element
this.gameboard = document.querySelector('#gameboard');
        // TODO: Set `this.winScreen` equal to the `#win-screen` element
this.winScreen = document.querySelector('#win-screen');
        // TODO: Set `this.winnerToken` equal to the `#winner-token` element
this.winnerToken = document.querySelector('#winner-token');
        // TODO: Set `this.drawScreen` equal to the `#draw-screen` element
this.drawScreen = document.querySelector('#draw-screen');
        // Initialize an Array representing the starting state of the game board.
        // This is provided for you. We can access the spaces on the board using
        // (X, Y) coordinates as `this.gameState[x][y]`, which is how the game
        // will check to see if the winner is known.
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        // Array of Win States
        // This is provided for you. Each of these arrays represents the ways
        // a player can win Tic Tac Toe. Each item in the array is another
        // array. Each of those arrays contains a set of (X, Y) coordinates.
        // If a player has claimed the tile at each of the coordinates listed in
        // one of the win states, then they have won the game.
        this.winStates = [
          [[0,0],[0,1],[0,2]],
          [[1,0],[1,1],[1,2]],
          [[2,0],[2,1],[2,2]],
          [[0,0],[1,0],[2,0]],
          [[0,1],[1,1],[2,1]],
          [[0,2],[1,2],[2,2]],
          [[0,0],[1,1],[2,2]],
          [[0,2],[1,1],[2,0]]
        ];
    }

    // This `checkForWinner()` method is provided for you, but you must fill in
    // the event dispatch lines that cause the end game screens to show.
    checkForWinner(){
        console.log('checking for winner');
        for (let condition of this.winStates){
            let winningCondition = true;
            for (let position of condition){
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;

                // If we've gotten here, then we need to createa  `win` event and
                // dispatch it.

                // TODO: Create a new event called `winEvent` that will dispatch the signal "win".
                
                let winEvent = new Event('win');

                // TODO: Dispatch the winEvent using the `document.dispatchEvent()` method.
                
                document.dispatchEvent(winEvent);

                return true; // Return a value to stop processing the additional move count check.
            }
        }
        this.moveCount++;
        console.log(`Reviewed move ${this.moveCount}.`)
        if (this.moveCount >= 9) {
            console.log(`This game is a draw at ${this.moveCount} moves.`);
            this.gameStatus = 'draw';

            // TODO: Create a new event called `drawEvent` that dispatches the signal "draw".
            
            let drawEvent = new Event ('draw');

            // TODO: Dispatch the `drawEvent` event.
            
            document.dispatchEvent(drawEvent);
        }
    }

    recordMove(event){
        console.log('recording move');
        // This method handles recording a move in the `this.gameState` property.
        // To record a move, we must accmoplish the following:

        // 1. Find the X, Y coordinates of the tile that was just selected
        // 2. Claim that tile in the `this.gameState` array
        // 3. Set the class attribute of the tile to reflect which player has claimed it

        // TODO: Define a variable called `tile_x` that equals the `data-x` attribute on the `event.target`.
        
        let tileX = event.target.dataset.x;

        // TODO: Define a variable called `tile_y` that equals the `data-y` attribute on the `event.target`.
        
        let tileY = event.target.dataset.y;
        
        // TODO: Claim this spot in the `this.gameState` array for the player.
        
        //new TODO: add conditional to check for claimed tile
       
        this.gameState[tileX][tileY] = this.currentPlayer.token;
        // TODO: Set the class on the `event.target` to show the player's token. The class
        // should be: `tile played glyphicon glyphicon-${this.currentPlayer.token}`.
        
        event.target.setAttribute('class', `tile played glyphicon glyphicon-${this.currentPlayer.token}`);
        
    }
    switchPlayer(){
        console.log('switching player');
        // This method handles switching between players after each move.
        // It must determine who the current player is, and then switch to the
        // other player. After that, it must set the class on the
        // `this.currentPlayerToken` property to show the proper class.
        
        if(this.currentPlayer === this.player1){
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
       
        this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`);
        
    }
    setUpTileListeners(){
        // This method sets up event listeners for tiles. It is called when we
        // start a new game. It must find all the tiles and apply event listeners
        // to them.
        console.log('setting up tile listeners');
        // TODO: Select all of the `.tile` elements into a variable called
        // `tileElements`.
        
        let tileElements = document.querySelectorAll('.tile');

        // TODO: Use a loop to add a "click" event listener to each tile that
        // will call the `handleMove` function whenever a tile is clicked.
        for (let tile of tileElements){
            tile.addEventListener('click', handleMove);
        }
    }
    showWinScreen(){
        // This method displays the end game screen for a Win.

        // TODO: Change the `class` attribute on the `this.winScreen` property
        // to "show".
        
        this.winScreen.setAttribute('class', 'show');

        // TODO: Change the `class` attribute on the `this.winnerToken` property
        // to show the proper winner's token.
        
        this.winnerToken.setAttribute('class', `glyphicon ${this.winner.token}`);
    }
    showDrawScreen(){
        // This method displays the end game screen for a Draw.

        // TODO: Set the `class` attribute on the `this.drawScreen` property
        // to "show".
        
        this.drawScreen.setAttribute('class', 'show');
    }
    setUpBoard(){
        // TODO: Clear all content from the existing `this.gameboard` element.
        
        console.log('setting up board');
        
        this.gameboard.innerHTML = '';
        // We must draw the game board by using a loop to create rows with
        // tiles in them. We want to create the same structure as we see in the
        // index.html file.
       
        for (let i=0; i<3; i++){                 
            
            let newRow = document.createElement('div');
           
            newRow.setAttribute('class', 'row');
            
                for (let j=0; j<3; j++){
                               
                    let newCol = document.createElement('div');
                                 
                    newCol.setAttribute('class', 'col-xs-3');                  
                              
                    let newTile = document.createElement('span');                    
                              
                    newTile.setAttribute('class', 'tile glyphicon glyphicon-question-sign');                   
                              
                    newTile.dataset.x = i;               
                              
                    newTile.dataset.y = j;
               
                    newCol.appendChild(newTile);         
                               
                    newRow.appendChild(newCol);
                   
               } // end of second for loop
            
            this.gameboard.appendChild(newRow);
         
        } // end of first for loop
        

        // TODO: Call `this.setUpTileListeners()` to add event listeners to the
        // `.tile` elements.
        this.setUpTileListeners();

    }
    initializeMovePrompt(){
        // This method initializes the `this.movePrompt` element.
        
        console.log('initializing move prompt');
        
        this.startPrompt.setAttribute('class', 'hidden');
        
        this.movePrompt.setAttribute('class', '');
        
        this.currentPlayer = this.player1;           
               
        this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`);
                
    }
    start(){
       
        console.log('starting game');
        
        this.setUpBoard();
       
        this.initializeMovePrompt();
    }
} // End of the Tic Tac Toe Class definition.

// Outside of the Class definitions, we need a few items to control the game
// so our players can successfull play.

// TODO: Add an event listener to the `document` object that will watch for the
// "DOMContentLoaded" event signal. This listener should execute an anonymous
// function to handle the "DOMContentLoaded" event.

    // TODO: Inside the "DOMContentLoaded" event handler, perform the following
    // steps:
    
let game;    //initialize game

console.log('game code starting');
    
document.addEventListener('DOMContentLoaded', function(event){
    
    console.log('DOM Content Loaded');
    
    let startButton = document.querySelector('#start-button');
    
    startButton.addEventListener('click', function(event){
        game = new TicTacToe();        
    
        game.start();
    
    }); // NOTE: End of the `startButton` event listener here.

}); // NOTE: End of the "DOMContentLoaded" event listener here.

// TODO: Add an event listener on the `document` object that listens for the
// "win" event signal.

document.addEventListener('win', function(event){
    game.showWinScreen();
});

    // TODO: In the handler for the "win" event, call the `game.showWinScreen()`
    // method to display the winning screen.

// NOTE: End of the "win" event listener.

// TODO: Add an event listener on the `document` object that listens for the
// "draw" event signal.

document.addEventListener('draw', function(event){
    game.showDrawScreen();
});

    // TODO: In the handler for the "draw" event, call the `game.showDrawScreen()`
    // method to display the tie game screen.

// NOTE: End of the "draw" event listener.

// External function for event listeners provided for you.
function handleMove(event){
    // Record the move for the current player.
    console.log('handling player move');
    game.recordMove(event);

    // Check to see if the last move was a winning move.
    game.checkForWinner();

    // Rotate players.
    game.switchPlayer();
}
