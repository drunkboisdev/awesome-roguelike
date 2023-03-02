"use strict"

import * as Map from "./modules/mapgen.mjs"
import * as Battle from "./modules/battle.mjs"
import PromptSync from "prompt-sync" // i have no idea how this works and i'm too scared to ask
const prompt = PromptSync() // "esm default" "commonjs" "module.export()" none of these words are in the bible
// TOTAL TIME SPENT: 15 HOURS
// awesomeroguelike.js time spent: 7 hours

function matToCellCoords(xy) {
    return (xy + 1) / 2
}

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms))
} // i still don't entirely know what a promise is but it was on stackoverflow and it worked so

function displayMap(map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            switch (map[i][j]) {
                case 0:
                    process.stdout.write("██")
                    break
                case 3:
                    process.stdout.write("St")
                    break
                case 4:
                    process.stdout.write("Fn")
                    break
                case 5:
                    process.stdout.write("En")
                    break
                case 6:
                    process.stdout.write("Tr")
                    break
                case 7:
                    process.stdout.write("Sh")
                    break
                case 8:
                    process.stdout.write("Ch")
                    break
                default:
                    process.stdout.write("  ")
            }
        }
        process.stdout.write("\n")
    }
}

let player = {
    maxHP: 20,
    hp: 20,
    x: 1,
    y: 1,
    spells: [
        "hit"
    ],
    map: [],
    initMap(fullMap) {
        for (let i = 0; i < fullMap.length; i++) {
            this.map[i] = []
            for (let j = 0; j < fullMap[0].length; j++) {
                if (i < 3 && j < 3) {
                    this.map[i][j] = 1
                } else {
                    this.map[i][j] = 0
                }
            }
        }
    },
    showMap(fMap) {
        for (let i = 0; i < fMap.length; i++) {
            let empty = 0
            for (let j = 0; j < fMap[0].length; j++) {
                if (this.map[i][j] === 1) {
                    switch (fMap[i][j]) {
                        case 0:
                            process.stdout.write("██")
                            break
                        case 3:
                            process.stdout.write("St")
                            break
                        case 4:
                            process.stdout.write("Fn")
                            break
                        case 5:
                            process.stdout.write("En")
                            break
                        case 6:
                            process.stdout.write("Tr")
                            break
                        case 7:
                            process.stdout.write("Sh")
                            break
                        case 8:
                            process.stdout.write("Ch")
                            break
                        default:
                            process.stdout.write("  ")
                    }
                } else {
                    process.stdout.write("  ")
                    empty++
                }
            }
            process.stdout.write("\n")
            if (empty === fMap.length) {
                break
            }
        }
    }
}

async function game() {
    const map = Map.generateMap(6)
    player.initMap(map)

    let input = prompt("what do you want to do? ")
    let easteregg = false
    while (input !== "quit") {
        switch (input.toLowerCase()) {
            case "test": // FOR TEST ONLY
                console.log("Test case big")
                break
            case "testmap": // also test only
                displayMap(map)
                break
            case "aroundme": // testing
                for (let i = -2; i < 1; i++) {
                    for (let j = -2; j < 1; j++) {
                        process.stdout.write(map[player.y * 2 + i][player.x * 2 + j].toString())
                    }
                    process.stdout.write("\n")
                }
                break
            case "tp": // test!!!
                let px = prompt("x? ")
                let py = prompt("y? ")
                player.x = px
                player.y = py
                break
            case "stats":
                console.log(`Health: ${player.hp} / ${player.maxHP}`)
                process.stdout.write(`Known spells: ${player.spells[0]}`)
                for (let i = 1; i < player.spells.length; i++) {
                    process.stdout.write(`, ${player.spells[i]}`)
                }
                console.log(`\nPosition: ${matToCellCoords(player.x)}, ${matToCellCoords(player.y)}`)
                break
            case "map":
                player.showMap(map)
                break
            case "right":
                if (map[player.y][player.x + 1] === 1) {
                    player.x += 2
                    console.log(`you move to ${matToCellCoords(player.x)}, ${matToCellCoords(player.y)}`)

                    for (let i = player.y - 1; i < player.y + 2; i++) {
                        for (let j = player.x; j < player.x + 2; j++) {
                            player.map[i][j] = 1
                        }
                    }

                    if (player.x === map.length - 2 && player.y === map.length - 2) {
                        console.log("wow!!! you did it!!!")
                    }
                } else {
                    console.log("there's a wall there!")
                }
                break
            case "down":
                if (map[player.y + 1][player.x] === 1) {
                    player.y += 2
                    console.log(`you move to ${matToCellCoords(player.x)}, ${matToCellCoords(player.y)}`)

                    for (let i = player.y; i < player.y + 2; i++) {
                        for (let j = player.x - 1; j < player.x + 2; j++) {
                            player.map[i][j] = 1
                        }
                    }

                    if (player.x === map.length - 2 && player.y === map.length - 2) {
                        console.log("wow!!! you did it!!!")
                    }
                } else {
                    console.log("there's a wall there!")
                }
                break
            case "left":
                if (map[player.y][player.x - 1] === 1) {
                    player.x -= 2
                    console.log(`you move to ${matToCellCoords(player.x)}, ${matToCellCoords(player.y)}`)

                    for (let i = player.y - 1; i < player.y + 2; i++) {
                        for (let j = player.x - 1; j < player.x + 1; j++) {
                            player.map[i][j] = 1
                        }
                    }
                } else {
                    console.log("there's a wall there!")
                }
                break
            case "up":
                if (map[player.y - 1][player.x] === 1) {
                    player.y -= 2
                    console.log(`you move to ${matToCellCoords(player.x)}, ${matToCellCoords(player.y)}`)

                    for (let i = player.y - 1; i < player.y + 1; i++) {
                        for (let j = player.x - 1; j < player.x + 2; j++) {
                            player.map[i][j] = 1
                        }
                    }
                } else {
                    console.log("there's a wall there!")
                }
                break
            case "eg":
                console.log(Battle.generateEnemies(1))
                break
            case "easteregg":
                if (!easteregg) {
                    console.log("hunting for secrets, i see.")
                    setTimeout(() => {
                        console.log("well, um, hi!")
                    }, 500)
                    await sleep(1000)
                    easteregg = true
                    break
                }
            default:
                console.log("that's not a valid command!")
        }
        input = prompt("what do you want to do? ")
    }
    console.log("see you next time!")
}

console.log("it's time for our trials to begin.")
setTimeout(() => {
    console.log("let's see how far we can get.")
    setTimeout(() => { prompt("hit enter to begin. ")
    game() }, 500)
}, 500)