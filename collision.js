function checkCollision(p) {
    let dx = p.x - target.x;
    let dy = p.y - target.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    return distance < target.radius;
}

function checkTankCollision(p) {
    let tankX = enemyTank.x;
    let tankY = enemyTank.y;
    let tankWidth = 40;
    let tankHeight = 20;
    let angleRad = enemyTank.angle * (Math.PI/180);

    if (enemyTank.destroyed) return false

    let relX = p.x - tankX;
    let relY = p.y - tankY;

    let unrotatedX = relX * Math.cos(-angleRad) - relY * Math.sin(-angleRad);
    let unrotatedY = relX * Math.sin(-angleRad) + relY * Math.cos(-angleRad);

    let halfWidth = tankWidth / 2;
    let halfHeight = tankHeight / 2;

    if (
        unrotatedX >= -halfWidth &&
        unrotatedX <= halfWidth &&
        unrotatedY >= -halfHeight &&
        unrotatedY <= halfHeight
    ) {
        enemyTank.health--;

        if (enemyTank.health <= 0) {
            enemyTank.destroyed = true;
            displayMessage("🔥 Tank destroyed!"); 
        }

        return true;
    }

    return false;
}

function checkGroundCollision(p) {
    console.log('here')
    console.log(p.x)
    console.log(terrain[p.x])
}