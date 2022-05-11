let TEST_CELLSIZE;

window.setInterval(function() {
    movePlayer(gameState);
    drawOnCanvas(canvas, gameState);
}, 500);

document.addEventListener('keyup', event => {
    gameState.pressedKey = event.code;
});

function movePlayer(gameState) {
    if (gameState.pressedKey === 'ArrowUp') {
        gameState.playerPosition.y -= 1;
    } else if (gameState.pressedKey === 'ArrowRight') {
        gameState.playerPosition.x += 1;
    } else if (gameState.pressedKey === 'ArrowDown') {
        gameState.playerPosition.y += 1;
    } else if (gameState.pressedKey === 'ArrowLeft') {
        gameState.playerPosition.x -= 1;
    }
}


function drawLine(x1, y1, x2, y2, context) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawSquare(x, y, cellSize, color, context) {
    context.fillStyle = 'red';
    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

function drawOnCanvas(canvas, gameState) {
    const context = canvas.getContext('2d');
    
    context.clearRect(0, 0, canvas.width, canvas.height)

    const cellSize = canvas.width / gameState.extent;

    TEST_CELLSIZE = cellSize;

    for (let i = 1; i <= gameState.extent; i++) {
        drawLine(i * cellSize, 0, i * cellSize, canvas.height, context);
        drawLine(0, i * cellSize, canvas.width, i * cellSize, context);
    }

    drawSquare(
        gameState.playerPosition.x,
        gameState.playerPosition.y,
        cellSize,
        'red',
        context
    );
}

const gameState = {
    pressedKey: 'ArrowRight',
    extent: 8,
    playerPosition: {
        x: 2,
        y: 3
    }
}

const canvas = document.getElementById('myCanvas')

drawOnCanvas(canvas, gameState);
