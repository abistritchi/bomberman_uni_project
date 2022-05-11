let TEST_CELLSIZE;
window.setInterval(function() {
    movePlayer(gameState);
    drawOnCanvas(canvas, gameState);
}, 500);

document.addEventListener('keyup', event => {
    gameState.pressedKey = event.code;
});
// code logic

//moving snake segments
function movePlayer(gameState) {
    //Save the Tail
    let snakeTailx = gameState.snakeSegments[0].x;
    let snakeTaily = gameState.snakeSegments[0].y;

    //Move everthing, exept the head
    for(let i = 0; i < (gameState.snakeSegments.length - 1); i++){
        gameState.snakeSegments[i].x = gameState.snakeSegments[i+1].x;
        gameState.snakeSegments[i].y = gameState.snakeSegments[i+1].y;
    }
       
    //Move the head
    if (gameState.pressedKey === 'ArrowUp') {
        gameState.snakeSegments[gameState.snakeSegments.length - 1].y -= 1;
    } else if (gameState.pressedKey === 'ArrowRight') {
        gameState.snakeSegments[gameState.snakeSegments.length - 1].x += 1;
    } else if (gameState.pressedKey === 'ArrowDown') {
        gameState.snakeSegments[gameState.snakeSegments.length - 1].y += 1;
    } else if (gameState.pressedKey === 'ArrowLeft') {
        gameState.snakeSegments[gameState.snakeSegments.length - 1].x -= 1;
    }
    
    //Check for collision with apple
    if (gameState.snakeSegments[gameState.snakeSegments.length - 1].x == gameState.apple.x &&
        gameState.snakeSegments[gameState.snakeSegments.length - 1].y == gameState.apple.y) {
        
        //adding snake segment
        gameState.snakeSegments.unshift({snakeTailx, snakeTaily});
        
        //random apple generator
        gameState.apple.x = Math.floor((Math.random() * gameState.extent));
        gameState.apple.y = Math.floor((Math.random() * gameState.extent));
    }
    
    //Checking for collision with border
    if(gameState.snakeSegments[gameState.snakeSegments.length - 1].x >= gameState.extent ||
        gameState.snakeSegments[gameState.snakeSegments.length - 1].y >= gameState.extent || 
        gameState.snakeSegments[gameState.snakeSegments.length-1].x < 0 || 
        gameState.snakeSegments[gameState.snakeSegments.length-1].y < 0){
            console.log('game over');
            gameState.gameOver = true;
        }
    //Checking for collision with snake body
    for (let i=0; i < (gameState.snakeSegments.length-1); i++){
        if (gameState.snakeSegments[i].x == gameState.snakeSegments[gameState.snakeSegments.length-1].x &&
            gameState.snakeSegments[i].y == gameState.snakeSegments[gameState.snakeSegments.length-1].y) {
            console.log('game over');
            gameState.gameOver = true;
            }
    }
            //context.fillStyle = 'red';
            //context.fillRect(0, 0, canvas.width, canvas.height);
}
  


// drawing part of code
function drawLine(x1, y1, x2, y2, context) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawSquare(x, y, cellSize, color, context) {
    context.fillStyle = color;
    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

function drawOnCanvas(canvas, gameState) {
    const context = canvas.getContext('2d');
    
    context.clearRect(0, 0, canvas.width, canvas.height)

    const cellSize = canvas.width / gameState.extent;

    TEST_CELLSIZE = cellSize;

    for (let i = 0; i <= gameState.extent; i++) {
        drawLine(i * cellSize, 0, i * cellSize, canvas.height, context);
        drawLine(0, i * cellSize, canvas.width, i * cellSize, context);
    }
   
    //drawing snake segments
    for (let i = 0; gameState.snakeSegments.length > i; i++) {
        drawSquare(
            gameState.snakeSegments[i].x,
            gameState.snakeSegments[i].y,
            cellSize,
            'black',
            context

        );
    }
    //drawing snake head
    drawSquare(
        gameState.snakeSegments[gameState.snakeSegments.length - 1].x,
        gameState.snakeSegments[gameState.snakeSegments.length - 1].y,
        cellSize,
        'yellow',
        context
    );
    //drawing apple
    drawSquare(
        gameState.apple.x,
        gameState.apple.y,
        cellSize,
        'red',
        context
    );

    if (gameState.gameOver == true) {
        //snakeSegments = [{}]
        context.fillStyle = 'blue';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}
//Objects
const gameState = {
    pressedKey: 'ArrowLeft',
    extent: 8,
//    playerPosition: {
//        x: 5,
//        y: 5
//    },
    apple: {
        x: 7,
        y: 5
    },
    snakeSegments: [
        {x: 4, y: 4},
    //    {x: 5, y: 4},
    //    {x: 5, y: 5}
    ],
    gameOver: false  
}


const canvas = document.getElementById('myCanvas')

//drawOnCanvas(canvas, gameState)
