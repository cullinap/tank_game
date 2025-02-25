const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let cannonAngle = 45;
let power = 50;
let cannonX = 75;
let cannonSpeed = 10;
let explosions = [];
let debrisParticles = [];
const cannonY = canvas.height * 0.7 - 30;
const terrain = [];
const terrainWidth = canvas.width;
const terrainResolution = 5;
const angleSlider = document.getElementById("angleControl");
const powerSlider = document.getElementById("powerControl");
const fireSound = new Audio("sounds/fire.mp3")
const explosionSound = new Audio("sounds/explosion.mp3")
const missSound = new Audio("sounds/miss.mp3")

let target = {x: Math.random() * 500 + 250, y: Math.random() * 200 + 100, radius: 20}
let enemyTank = {x:0, y:0};

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft" && cannonX > 50) {
        cannonX -= cannonSpeed;
    }

    if (event.key == "ArrowRight" && cannonX < 400) {
        cannonX += cannonSpeed;
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
    // updateDebug();
})

function drawTarget() {
    let colors = ["red", "white", "red", "white"];
    let ringsize = target.radius / colors.length;

    for (let i=0; i <  colors.length; i++) {
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius - i * ringsize, 0, Math.PI *2);
        ctx.fillStyle = colors[i];
        ctx.fill();
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// function generateEnemyTank() {
//     let validPositions = terrain.filter(t => t.x > canvas.width / 2);

//     if (validPositions.length > 0) {
//         let chosenSpot = validPositions[Math.floor(Math.random() * validPositions.length)];
//         enemyTank.x = chosenSpot.x;
//         enemyTank.y = chosenSpot.y - 15;
//     }
// }

function generateEnemyTank() {
    return Math.floor(Math.random() * (500 - 400 + 1));
}

function drawEnemyTank() {
    //enemyTank.x = generateEnemyTank();
    ctx.fillStyle = "#8B0000";
    // ctx.fillRect(enemyTank.x - 20, enemyTank.y, 40, 20);
    ctx.fillRect(enemyTank.x, 200, 60, 30);

    ctx.fillStyle = "#550000";
    //ctx.fillRect(enemyTank.x - 5, enemyTank.y - 10, 20, 5);
    ctx.fillRect(500-5, 200-10, 40, 10);

    // ctx.fillStyle = "black";
    // for(let i=-15; i<=15; i+=10) {
    //     ctx.beginPath();
    //     ctx.arc(enemyTank.x + i, enemyTank.y + 10, 3, 0, Math.PI * 2);
    //     ctx.fill();
    // }
}

function createExplosion(x,y) {
    for (let i = 0; i < 15; i++) {
        // let angle = Math.random() * Math.PI * 2;
        let size = Math.random() * 2 + 2;

        explosions.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4, 
            vy: (Math.random() - 0.5) * 4,
            opacity: 1.0,
            size: size,
            //angle: angle, 
            color: `rgb(${Math.random() * 255}, ${Math.random() * 100}, 0)` 
        })
    }

    for (let i=0; i<25; i++) {
        debrisParticles.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 0.5, 
            vy: (Math.random() - 0.5) * 0.5,
            gravity: 0.1,
            size: Math.random() * 0.25 + 2, 
            color: ["#AF7553","#654321","#000000"][Math.floor(Math.random()*3)],
            opacity: 1.0, 
        });
    }

    //console.log(debrisParticles)
    //console.log("explosion triggered", debrisParticles.length);
}

function drawExplosions(x,y) {
    for (let i = 0; i < explosions.length; i++) {
        let explosion = explosions[i];

        ctx.beginPath();
        ctx.fillStyle = explosion.color //`rgba(${explosion.color}, ${explosion.opacity});`
        ctx.arc(explosion.x, explosion.y, explosion.size, 0, Math.PI * 2);
        ctx.fill();

        explosion.x += explosion.vx;
        explosion.y += explosion.vy;
        explosion.opacity -= 0.03;
        explosion.size += 0.02;
    }

    explosions = explosions.filter(explosion => explosion.opacity > 0);
}

function drawDebris() {
    for (let i = 0; i < debrisParticles.length; i++) {
        let debris = debrisParticles[i];
        // console.log(debris.color)

        ctx.beginPath();
        ctx.fillStyle = debris.color;//`#AF7553`//`rgba(139, 69, 19 ${debris.opacity})`;
        ctx.arc(debris.x, debris.y, debris.size, 0, Math.PI * 2);
        ctx.fill();

        debris.x += debris.vx;
        debris.y += debris.vy; 
        debris.vy += debris.gravity; 
        debris.opacity -= 0.05;
    }

    debrisParticles = debrisParticles.filter(debris => debris.opacity > 0);
}

function generateTerrain() {
    let flatGroundWidth = 200;
    let height = canvas.height * 0.7;

    for(let x=0; x < terrainWidth; x+=terrainResolution) {
        if (x < flatGroundWidth) {
            terrain.push({x: x, y: height});
        } else {
            height += (Math.random() - 0.5) * 15;
            height = Math.min(canvas.height - 50, Math.max(canvas.height * 0.4, height));

            terrain.push({x:x, y:height});
        }
    }
}

function drawTerrain() {
    ctx.fillStyle = "#654321";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);

    for(let i=0; i<terrain.length; i++) {
        ctx.lineTo(terrain[i].x, terrain[i].y); 
    }

    ctx.lineTo(canvas.height, canvas.width);
    ctx.closePath();
    ctx.fill();
}

function resetTarget() {
    target.x = Math.random() * 500 + 250;
    target.y = Math.random() * 200 + 100;
}

// Draw the cannon
function drawCannon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#4B5320";

    // base of cannon
    ctx.fillRect(cannonX - 30, cannonY, 60, 30);

    ctx.fillStyle = "black";
    for (let i=-20; i<=20; i+=10) {
        ctx.beginPath();
        ctx.arc(cannonX+i, cannonY+32, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    // Cannon barrel (rotating)
    ctx.save();
    ctx.translate(cannonX, cannonY - 5);
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
        x: cannonX,
        y: cannonY - 5,
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
    console.log(`enemyTank position: ${enemyTank.x, enemyTank.y}`)
}

function updateDebug() {
    let angleRad = (cannonAngle * Math.PI) / 180;
    let velocity = power / 5;
    let velocityX = Math.cos(angleRad) * velocity;
    let velocityY = -Math.sin(angleRad) * velocity;

    debugBox.innerText = 
    `
    Angle (Degrees): ${cannonAngle}
    Angle (Radian): ${angleRad.toFixed(2)}
    Power: ${power}
    Intial Vx: ${velocityX.toFixed(2)}
    Intial Vy: ${velocityY.toFixed(2)}
    Projectiles in Air: ${projectiles.length}
    Debris Particles: ${debrisParticles.length}
    EnemyTank: ${enemyTank}
    `
}

function updateProjectiles() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawCannon();
    //drawTarget();
    //generateEnemyTank();
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
updateProjectiles();
