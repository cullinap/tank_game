const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let cannonAngle = 45;
let power = 50;
//let cannonX = 75; //75
let cannonSpeed = 10;
let explosions = [];
let debrisParticles = [];
//const cannonY = canvas.height * 0.7 - 30;
//const terrain = [];
const terrainWidth = canvas.width;
const terrainResolution = 5;
const angleSlider = document.getElementById("angleControl");
const powerSlider = document.getElementById("powerControl");
const fireSound = new Audio("sounds/fire.mp3")
const explosionSound = new Audio("sounds/explosion.mp3")
const missSound = new Audio("sounds/miss.mp3")

let target = {x: Math.random() * 500 + 250, y: Math.random() * 200 + 100, radius: 20}
let enemyTank = {x:0, y:200, angle: 0};
let cannonPos = {x: 75, y: canvas.height * 0.7 - 30, angle: 0}

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft" && cannonPos.x > 50) {
        cannonPos.x -= cannonSpeed;
    }

    if (event.key == "ArrowRight" && cannonPos.x < 400) {
        cannonPos.x += cannonSpeed;
    }

    if (event.key == "ArrowUp" && cannonAngle < 90) {
        cannonAngle += 2;
        angleSlider.value = cannonAngle;
    }

    if (event.key == "ArrowDown" && cannonAngle > 0) {
        cannonAngle -= 2;
        angleSlider.value = cannonAngle;
    }

    if (event.key == "w" && power < 100) {
        power += 5; 
        powerSlider.value = power;
    }

    if (event.key == "s" && power > 0) {
        power -= 5;
        powerSlider.value = power; 
    }

    drawCannon();
})

function generateCannonPosition() {
    let leftPoint = terrain.find(t => t.x >= cannonPos.x - terrainResolution);
    let rightPoint = terrain.find(t => t.x >= cannonPos.x + terrainResolution);

    if (leftPoint && rightPoint) {
        let deltaX = rightPoint.x - leftPoint.x;
        let deltaY = rightPoint.x - leftPoint.x;

        cannonPos.y = leftPoint.y - 20;
        cannonPos.angle = Math.atan2(deltaY, deltaX) * (180/Math.PI);
    } else {
        cannonPos.y = canvas.height * 0.7 - 30;
        cannonPos.angle = 0;
    }
}

// Draw the cannon
function drawCannon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#4B5320";

    // base of cannon
    ctx.fillRect(cannonPos.x - 30, cannonPos.y, 60, 30);

    ctx.fillStyle = "black";
    for (let i=-20; i<=20; i+=10) {
        ctx.beginPath();
        ctx.arc(cannonPos.x+i, cannonPos.y+32, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    // Cannon barrel (rotating)
    ctx.save();
    ctx.translate(cannonPos.x, cannonPos.y - 5);
    ctx.rotate(-cannonAngle * Math.PI / 180); // degrees * pi / 180
    ctx.fillStyle = '#333';
    ctx.fillRect(0, -5, 50, 10);
    ctx.restore();
}

// update angle from the slider
document.getElementById("angleControl").addEventListener("input", (e) => {
    cannonAngle = e.target.value;
    drawCannon();
});

document.getElementById("powerControl").addEventListener("input", (e) => {
    power = e.target.value;
    drawCannon();
})

drawCannon();

let projectiles = []

function fireCannon() {
    if (shotsLeft <= 0) {
        displayMessage("🚫 No shots left! Reset the game.");
        return;
    }

    shotsLeft--;
    updateShots();

    let angleRad = cannonAngle * Math.PI / 180; // angle of cannon in Radians calc initial horizontal and vertical velocity component
    let velocityX = Math.cos(angleRad) * power; // horizontal speed
    let velocityY = -Math.sin(angleRad) * power; // vertical speed

    projectiles.push({
        x: cannonPos.x,
        y: cannonPos.y - 5,
        vx: velocityX / 5,
        vy: velocityY / 5,
        gravity: 0.2,
    });

    fireSound.currentTime = 0;
    fireSound.play();

    console.log(`Firing Cannon! 🎯`)
    console.log(`Angle (Degrees): ${cannonAngle}`)
    console.log(`Power: ${power}`)
    console.log(`Intial Vx: ${velocityX.toFixed(2)}`)
    console.log(`Intial Vy: ${velocityY.toFixed(2)}`)
    console.log(`Projectiles in Air: ${projectiles.length}`)
    console.log(`enemyTank xposition: ${enemyTank.x}`)
    console.log(`enemyTank yposition: ${enemyTank.y}`)
}

function updateProjectiles() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    generateCannonPosition();
    drawCannon();
    //drawTarget();
    //generateEnemyTank();
    deBugLines();
    drawEnemyTank();
    drawTerrain();

    projectiles.forEach((p, index) => {
        p.vy += p.gravity; // increases downward velocity
        p.x += p.vx; // move horizontally
        p.y += p.vy; // move vertically

        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();

        if (checkTankCollision(p)) {
            createExplosion(p.x, p.y);
            projectiles.splice(index, 1)
            explosionSound.currentTime = 0;
            explosionSound.play()
            updateScore(1);
            //drawDebris();
            //drawExplosions();
            displayMessage("🎯 Hit!");
        }

        // Remove if off screen
        if (p.y > canvas.height) {
            projectiles.splice(index, 1);
            missSound.currentTime = 0;
            missSound.play()
            displayMessage("❌ Miss!"); 
        }
    });
   
    drawExplosions();
    drawDebris();
    requestAnimationFrame(updateProjectiles);
}

generateTerrain();
generateEnemyTank();
updateProjectiles();
