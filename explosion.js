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