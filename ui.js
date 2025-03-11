let score = 0;
let shotsLeft = 5;
let enemyHealth = 3;

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

function checkEnemyTankHealth(hit) {
    enemyHealth -= hit
    if (enemyHealth == 0) {
        document.getElementById("enemyHealth").innerText = 'tank destroyed';
    } else {
        document.getElementById("enemyHealth").innerText = enemyHealth;
    }
}

function resetGame() {
    shotsLeft = 5;
    score = 0;
    enemyHealth = 3;
    document.getElementById("score").innerText = score;
    document.getElementById("enemyHealth").innerText = enemyHealth;
    updateShots();
    displayMessage("Game Reset!");
}

