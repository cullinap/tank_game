function checkCollision(p) {
    let dx = p.x - target.x;
    let dy = p.y - target.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    return distance < target.radius;
}

function checkTankCollision(p) {
    let tankWidth = 40;
    let tankHeight = 20;

    return (
        p.x >= enemyTank.x - tankWidth / 2 &&
        p.x <= enemyTank.x + tankWidth / 2 &&
        p.y >= enemyTank.y &&
        p.y <= enemyTank.y + tankHeight
    );
}