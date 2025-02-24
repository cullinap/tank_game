let score = 0;
let shotsLeft = 5;

function displayMessage(msg) {
    document.getElementById("result").innerText = msg;
}

function updateScore(points) {
    score += points;
    document.getElementById("score").innerText = score;
}

function updateShots() {
    document.getElementById("shots").innerText = shotsLeft;
}

function resetGame() {
    shotsLeft = 5;
    score = 0;
    document.getElementById("score").innerText = score;
    updateShots();
    displayMessage("Game Reset!");
}

