// Get the canvas context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Snake spawn point
let snake = [
    { x: 9 * scale, y: 10 * scale }
];

// Food location
let food = spawnFood();

// Game state
let direction = "RIGHT";
let score = 0;
let paused = false;  // Add a paused state

// Controls
document.addEventListener("keydown", changeDirection);

// Game loop
function game() {
    if (paused) {
        return; // Stop the game loop if paused
    }

    if (gameOver()) {
        alert("Game Over!");
        document.location.reload(); // Restart the game
        return;
    }

    setTimeout(() => {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        updateScore();
        game();  // Continue the game loop
    }, 100);
}

// Create background
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "brown"; // Head is green, body is brown
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });
}

// Move the snake
function moveSnake() {
    let head = Object.assign({}, snake[0]);

    if (direction === "LEFT") head.x -= scale;
    if (direction === "UP") head.y -= scale;
    if (direction === "RIGHT") head.x += scale;
    if (direction === "DOWN") head.y += scale;

    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood(); // Spawn new food
    } else {
        snake.pop(); // Remove the tail
    }
}

// Spawn food in a random location
function spawnFood() {
    let foodX = Math.floor(Math.random() * rows) * scale;
    let foodY = Math.floor(Math.random() * columns) * scale;
    return { x: foodX, y: foodY };
}

// Draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, scale, scale);
}

// Change snake direction
function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";

    // Check for the pause button (Spacebar - keyCode 32)
    if (event.keyCode === 32) {
        paused = !paused; // Toggle pause state
        if (!paused) {
            game(); // Restart the game loop when unpaused
        }
    }
}

// Check if game over
function gameOver() {
    // Check if snake collides with walls
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }

    // Check if snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Update score on the screen
function updateScore() {
    document.getElementById('score').textContent = "Score: " + score;
}

// Start the game loop
game();


