// time spent: 0.5h
let enemies = []

function generateEnemies(floorNum) {
    let i = 0
    // generate type
    while (i < 5 || enemies.length < 1) {
        const rand = Math.floor(Math.random() * (11 - floorNum))
        if (rand < 5) {
            enemies.push(rand * 2)
        }
        i++
    }
    // determine exact enemy
    for (let i = 0; i < enemies.length; i++) {
        const rand = Math.floor((Math.random() * 5 + 1) * floorNum ** 2)

        // determine tier
        if (rand > 50) {
            enemies[i] += 20
        } else if (rand > 20) {
            enemies[i] += 10
        }
        console.log(rand)

        // determine enemy
        const rand2 = Math.random()
        if (rand2 > 0.5) {
            enemies[i]++
        }
    }
    return enemies
}

export {generateEnemies}