const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//let cannonAngle = 45;
let power = 50;
let enemyPower = 50;
//let cannonX = 75; //75
let cannonSpeed = 10;
let explosions = [];
let debrisParticles = [];
//const cannonY = canvas.height * 0.7 - 30;
//const terrain = [];
const terrainWidth = canvas.width;
const terrainResolution = 35;
const angleSlider = document.getElementById("angleControl");
const powerSlider = document.getElementById("powerControl");
const fireSound = new Audio("sounds/fire.mp3")
const explosionSound = new Audio("sounds/explosion.mp3")
const missSound = new Audio("sounds/miss.mp3")

let gameState = 'start';
let currentLevel = 1;

let target = {x: Math.random() * 500 + 250, y: Math.random() * 200 + 100, radius: 20}
let enemyTank = {x:0, y:200, angle: 330, bodyAngle: 0, health: 3, destroyed: false, shotCounter: 0};
let cannonPos = {x: 75, y: canvas.height * 0.7 - 30, angle: 45, health: 3, destroyed: false};

window.addEventListener('keydown', (event) => {
    if (gameState === 'start' && event.code === 'Space') {
        startGame();
    }
})

function startGame() {
    gameState = 'playing';
    generateTerrain();
    generateEnemyTank();
    generateObject();
    updateProjectiles();
}

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft" && cannonPos.x > 50) {
        cannonPos.x -= cannonSpeed;
    }

    if (event.key == "ArrowRight" && cannonPos.x < 400) {
        cannonPos.x += cannonSpeed;
    }

    if (event.key == "ArrowUp" && cannonPos.angle < 90) {
        cannonPos.angle += 2;
        angleSlider.value = cannonPos.angle;
    }

    if (event.key == "ArrowDown" && cannonPos.angle > 0) {
        cannonPos.angle -= 2;
        angleSlider.value = cannonPos.angle;
    }

    if (event.key == "w" && power < 100) {
        power += 5; 
        powerSlider.value = power;
    }

    if (event.key == "s" && power > 0) {
        power -= 5;
        powerSlider.value = power; 
    }

    // shadow enemykeys -- to be deleted later
    if (event.key == "i" && enemyTank.angle < 360) {
        enemyTank.angle += 2;
        //angleSlider.value = enemyTank.angle;
    }

    if (event.key == "k" && enemyTank.angle > 280) {
        enemyTank.angle -= 2;
        //angleSlider.value = enemyTank.angle;
    }

    if (event.key == "j" && enemyPower < 100) {
        enemyPower += 5; 
        //powerSlider.value = enemyPower;
    }

    if (event.key == "l" && enemyPower > 0) {
        enemyPower -= 5;
        //powerSlider.value = enemyPower; 
    }

    drawCannon();
    drawEnemyTank();
})

function generateCannonPosition() {
    let leftPoint = terrain.find(t => t.x >= cannonPos.x - terrainResolution);
    let rightPoint = terrain.find(t => t.x >= cannonPos.x + terrainResolution);

    if (leftPoint && rightPoint) {
        let deltaX = rightPoint.x - leftPoint.x;
        let deltaY = rightPoint.x - leftPoint.x;

        cannonPos.y = leftPoint.y - 20;
        //cannonPos.angle = Math.atan2(deltaY, deltaX) * (180/Math.PI);
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

    let barWidth = 40; 
    let barHeight = 5;
    let healthPercentage = cannonPos.health / 3;

    ctx.fillStyle = 
        healthPercentage > 0.5 ? "green":
        healthPercentage > 0.3 ? "yellow":
        "red";

    ctx.fillRect(cannonPos.x - barWidth/2, cannonPos.y - 30, barWidth * healthPercentage, barHeight);

    ctx.strokeStyle = "black";
    ctx.strokeRect(cannonPos.x - barWidth/2, cannonPos.y - 30, barWidth, barHeight)


    // Cannon barrel (rotating)
    ctx.save();
    ctx.translate(cannonPos.x, cannonPos.y);
    //console.log(`cannonPos Angle: ${cannonPos.angle}`)
    ctx.rotate(-cannonPos.angle * Math.PI / 180); // degrees * pi / 180
    ctx.fillStyle = '#333';
    ctx.fillRect(0, -5, 50, 10);
    ctx.restore();
}

// update angle from the slider
document.getElementById("angleControl").addEventListener("input", (e) => {
    cannonPos.angle = e.target.value;
    drawCannon();
});

document.getElementById("powerControl").addEventListener("input", (e) => {
    power = e.target.value;
    drawCannon();
})

drawCannon();

let enemyProjectiles = []

function fireEnemyCannon() {
    console.log(`cannon enemyTank Angle: ${enemyTank.angle}`)
    let enemyAngleRad = enemyTank.angle * Math.PI / 180;
    let velocityX = -Math.cos(enemyAngleRad) * power;
    let velocityY = Math.sin(enemyAngleRad) * power;

    enemyProjectiles.push({
        x: enemyTank.x,
        y: enemyTank.y,
        vx: velocityX / 5,
        vy: velocityY / 5,
        gravity: 0.2,
    })
}

let projectiles = []

function fireCannon() {
    if (shotsLeft <= 0) {
        displayMessage("🚫 No shots left! Reset the game.");
        return;
    }

    if (enemyHealth <= 0) {
        displayMessage("enemy tank destroyed");
        return;
    }

    shotsLeft--;
    updateShots();

    let angleRad = cannonPos.angle * Math.PI / 180; // angle of cannon in Radians calc initial horizontal and vertical velocity component
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
    console.log(`Angle (Degrees): ${cannonPos.angle}`)
    console.log(`Power: ${power}`)
    console.log(`Intial Vx: ${velocityX.toFixed(2)}`)
    console.log(`Intial Vy: ${velocityY.toFixed(2)}`)
    console.log(`Projectiles in Air: ${projectiles.length}`)
    console.log(`enemyTank xposition: ${enemyTank.x}`)
    console.log(`enemyTank yposition: ${enemyTank.y}`)
    console.log(terrain)
}

function startLevel() {
    terrain = [];
    projectiles = [];
    explosions = [];
    enemyTank.destroyed = false;
    enemyTank.health = 3 + currentLevel - 1;

    generateTerrain();
    generateCannonPosition();
    generateEnemyTank();

    displayMessage(`level ${currentLevel}`);
}

function endLevel() {
    terrain = [];
    projectiles = [];
    explosions = [];
    enemyTank.destroyed = false;
    enemyTank.health = 3 + currentLevel - 1;
    cannonPos.destroyed = false;
    cannonPos.health = 3 + currentLevel - 1;

    generateTerrain();
    generateCannonPosition();
    generateEnemyTank();

    displayMessage(`level ${currentLevel}`);
}

function drawLevelHUD() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Level: ${currentLevel}`, 0, 0);
}

function autoAdjustEnemyRange() {
    if (enemyTank.shotCounter != 0 && enemyTank.angle >= 330 && enemyTank.angle <= 360) {
        enemyTank.angle += 20;
    } else if (enemyTank.shotCounter != 0 && enemyTank.angle <= 330 && enemyTank.angle >= 250) {
        enemyTank.angle -= 60;
    }
}

setInterval(() => {
    autoAdjustEnemyRange();
    fireEnemyCannon();
    enemyTank.shotCounter +=1;
}, 6000)

function updateProjectiles() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawLevelHUD();

    if (gameState === 'start') {
        drawOpeningScreen();
    } else if (gameState === 'playing') {
        generateCannonPosition();
        drawCannon();
        //drawTarget();
        //generateEnemyTank();
        //deBugLines();
        drawEnemyTank();
        //generateObject();
        drawObject();
        drawTerrain();
        drawEnemyTargetLine();

        enemyProjectiles.forEach((p, index) => {
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();

            if (checkEnemyTankCollision(p)) {
                createExplosion(p.x, p.y);
                projectiles.splice(index, 1);
                explosionSound.currentTime = 0;
                explosionSound.play();
                displayMessage("Damage!");
                if(cannonPos.destroyed) {
                    setTimeout(() => {
                        if(currentLevel <= 1) {currentLevel = 0} else {currentLevel--};
                        endLevel();
                    }, 2000);
                }
            }

            let leftPoint = terrain.find(t => t.x >= p.x - terrainResolution);
            let rightPoint = terrain.find(t => t.x >= p.x + terrainResolution);
            
            if (leftPoint && rightPoint) {
                let groundY = leftPoint.y + (rightPoint.y - leftPoint.y) * ((p.x - leftPoint.x) / (rightPoint.x - leftPoint.x))
                
                if (p.y >= groundY ) {
                    //createExplosion(p.x, groundY)
                    projectiles.splice(index, 1);
                    explosionSound.currentTime = 0;
                    explosionSound.play()
                    displayMessage("❌ Enemy Miss!");
                }
            }
        })

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
                //checkEnemyTankHealth(1)
                displayMessage("🎯 Hit!");
                if(enemyTank.destroyed) {
                    setTimeout(() => {
                        currentLevel++;
                        startLevel();
                    }, 2000);
                }
            }

            let leftPoint = terrain.find(t => t.x >= p.x - terrainResolution);
            let rightPoint = terrain.find(t => t.x >= p.x + terrainResolution);
            
            if (leftPoint && rightPoint) {
                let groundY = leftPoint.y + (rightPoint.y - leftPoint.y) * ((p.x - leftPoint.x) / (rightPoint.x - leftPoint.x))
                
                if (p.y >= groundY ) {
                    createExplosion(p.x, groundY)
                    projectiles.splice(index, 1);
                    explosionSound.currentTime = 0;
                    explosionSound.play()
                    displayMessage("❌ Miss!");
                }
            }
        });
    
        drawExplosions();
        drawDebris();
        requestAnimationFrame(updateProjectiles);
    }
}

generateTerrain();
generateEnemyTank();
generateObject();
updateProjectiles();
