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
    if (enemyTank.destroyed ) {
        return;
    }

    ctx.save();
    ctx.translate(enemyTank.x, enemyTank.y);
    ctx.rotate(enemyTank.angle * Math.PI / 180);
    
    ctx.fillStyle = "#8B0000"; 
    ctx.fillRect(-20, 0, 40, 20);

    ctx.restore();
    
    let barWidth = 40; 
    let barHeight = 5;
    let healthPercentage = enemyTank.health / 3;

    ctx.fillStyle = 
        healthPercentage > 0.5 ? "green":
        healthPercentage > 0.3 ? "yellow":
        "red";

    ctx.fillRect(enemyTank.x - barWidth/2, enemyTank.y - 10, barWidth * healthPercentage, barHeight);

    ctx.strokeStyle = "black";
    ctx.strokeRect(enemyTank.x - barWidth/2, enemyTank.y - 10, barWidth, barHeight)

}

function resetTarget() {
    target.x = Math.random() * 500 + 250;
    target.y = Math.random() * 200 + 100;
}
