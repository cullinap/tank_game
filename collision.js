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

    let relX = p.x - tankX;
    let relY = p.y - tankY;

    let unrotatedX = relX * Math.cos(-angleRad) - relY * Math.sin(-angleRad);
    let unrotatedY = relX * Math.sin(-angleRad) + relY * Math.cos(-angleRad);

    let halfWidth = tankWidth / 2;
    let halfHeight = tankHeight / 2;

    // if (
    //     p.x >= 500 && 
    //     p.x <= 540 && 
    //     p.y >= 200 && 
    //     p.y <= 220
    // ) {
    //     console.log(
    //         `
    //          Shot report:
    //          Min x: ${p.x >= enemyTank.x}
    //          Max x: ${p.x <= enemyTank.x + tankWidth}
    //          Max y: ${p.y >= enemyTank.y} 
    //          Min y: ${p.y <= enemyTank.y + tankHeight}
    //          Projectile Position position:
    //          Projectile x: ${p.x}
    //          Projectile y: ${p.y}
    //          Tank position:
    //          Tank left: ${enemyTank.x}
    //          Tank right: ${enemyTank.x + tankWidth}
    //          Tank top: ${enemyTank.y}
    //          Tank bottom: ${enemyTank.y + tankHeight}
    //         `
    //     )
    // } else if (
    //     p.x >= 450 && 
    //     p.x <= 560 && 
    //     p.y >= 190 && 
    //     p.y <= 260
    // ) {
    //     console.log(
    //         `
    //          Projectile Position position:
    //          Projectile x: ${p.x}
    //          Projectile y: ${p.y}
    //         `
    //     )
    //     if (p.x >= 500 && p.x <= 540) {
    //         console.log("x hit")
    //     }

    //     if (p.y >= 200 && p.y <= 220) {
    //         console.log("y hit")
    //     }

    // }
    // if between 480 and 520 and 200 and 220
    return (
        unrotatedX >= -halfWidth &&
        unrotatedX <= halfWidth &&
        unrotatedY >= -halfHeight &&
        unrotatedY <= halfHeight
    );
}

function checkGroundCollision(p) {
    console.log('here')
    console.log(p.x)
    console.log(terrain[p.x])
}