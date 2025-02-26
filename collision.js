function checkCollision(p) {
    let dx = p.x - target.x;
    let dy = p.y - target.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    return distance < target.radius;
}

function checkTankCollision(p) {
    let tankWidth = 40;
    let tankHeight = 20;
    if (p.x >= 480 && p.x <= 520) {
        console.log(`check enemy tankx1 ${p.x >= enemyTank.x - tankWidth / 2}`)
        console.log(`projectile p.x ${p.x}`)
        //console.log(`tankx1 tank-x/width ${enemyTank.x - tankWidth / 2}`)
        console.log(`check enemy tankx2 ${p.x <= enemyTank.x + tankWidth / 2}`)
        //console.log(`check tankx2 ${enemyTank.x + tankWidth / 2}`)
        
        console.log(`check enemy tanky1 ${p.y >= enemyTank.y}`)
        console.log(`check enemy tanky1 ${p.y <= enemyTank.y + tankHeight}`)
        console.log(`project y pos ${p.y}`)
        //console.log(`y1 size ${enemyTank.y}`)
        //console.log(`check enemy tanky2 ${p.y <= enemyTank.y + tankHeight}`)
    }

    // if between 480 and 520 and 200 and 220
    return (
        p.x >= enemyTank.x - tankWidth / 2 && // 480
        p.x <= enemyTank.x + tankWidth / 2 && // 520
        p.y >= enemyTank.y - 50 && // 200
        p.y <= enemyTank.y + tankHeight // 220
    );
}