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

function generateEnemyTank() {
    enemyTank.x = Math.floor(Math.random() * (600 - 400 + 1)) + 400;
    //enemyTank.y = Math.floor(Math.random() * (240 - 190 + 1)) + 190;

    let leftPoint = terrain.find(t => t.x >= enemyTank.x - terrainResolution)
    let rightPoint = terrain.find(t => t.x >= enemyTank.x + terrainResolution)

    if (leftPoint && rightPoint) {
        let deltaX = rightPoint.x - leftPoint.x;
        let deltaY = rightPoint.y - leftPoint.y;

        enemyTank.angle = Math.atan2(deltaY, deltaX) * (100 / Math.PI);
        enemyTank.y = leftPoint.y - 20;
    } else {
        enemyTank.y = 200;
        enemyTank.angle = 0;
    }
}

function drawEnemyTank() {
    if (enemyHealth <= 0) {
        return;
    }

    ctx.save();
    ctx.translate(enemyTank.x, enemyTank.y);
    ctx.rotate(enemyTank.angle * Math.PI / 180);
    
    ctx.fillStyle = "#8B0000"; 
    ctx.fillRect(-20, 0, 40, 20);

    ctx.restore();
    //enemyTank.x = generateEnemyTank();
    // ctx.fillStyle = "#8B0000";
    // // ctx.fillRect(enemyTank.x - 20, enemyTank.y, 40, 20);
    // ctx.fillRect(enemyTank.x, enemyTank.y, 40, 20);

    // ctx.fillStyle = "#550000";
    // //ctx.fillRect(enemyTank.x - 5, enemyTank.y - 10, 20, 5);
    // ctx.fillRect(enemyTank.x-5, enemyTank.y-10, 40, 10);

    // ctx.fillStyle = "black";
    // for(let i=-15; i<=15; i+=10) {
    //     ctx.beginPath();
    //     ctx.arc(enemyTank.x + i, enemyTank.y + 10, 3, 0, Math.PI * 2);
    //     ctx.fill();
    // }
}

function resetTarget() {
    target.x = Math.random() * 500 + 250;
    target.y = Math.random() * 200 + 100;
}
