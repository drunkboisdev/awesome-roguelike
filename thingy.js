"use strict"

import * as Map from "./modules/mapgen.mjs"
import PromptSync from "prompt-sync"
const prompt = promptSync()
// TIME SPENT: 6 HOURS

/*class Room {
    constructor(type) {
        this.type = type
    }
    connect() {

    }
}*/

function displayMap(map) {
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (map[i][j] === 0) {
                process.stdout.write("██")
            } else if (map[i][j] === 3) {
                process.stdout.write("Tr")
            } else if (map[i][j] === 4) {
                process.stdout.write("Sh")
            } else if (map[i][j] === 5) {
                process.stdout.write("En")
            } else if (map[i][j] === 6) {
                process.stdout.write("St")
            } else if (map[i][j] === 7) {
                process.stdout.write("Fn")
            }
            else {
                process.stdout.write("  ")
            }
        }
        process.stdout.write("\n")
    }
}

function battle(floorNum) {
    let enemies = []
    for (let i = 0; i < 5; i++) {
        let enemyType = Math.floor(Math.random() * (10 - floorNum))
        if (enemyType < 4) {
            enemies.push(enemyType)
            continue
        }
        if (enemies.length === 0 && i === 4) { // to guarantee at least one enemy
            i--
        }
    }
    for (let i = 0; i < enemies.length; i++) {
        let tier = Math.floor((Math.random() * 5 + 1) * Math.pow(floorNum, 2))

        if (tier < 20) {
            // keep tier 1 enemies from turning into tier 2 enemies
        } else if (tier < 50) {
            enemies[i] += 5
        } else if (tier < 150) {
            enemies[i] += 10
        }
    }
}

function game() {
    console.log("hi")
    const map = Map.generateMap(5)
}

console.log("\nit's time for our trials to begin.")
setTimeout(() => {
    console.log("let's see how far we can get.")
    setTimeout(() => { prompt("hit enter to begin. ")
    game() }, 500)
}, 500)