const prompt = require("prompt-sync")()

/*class Room {
    constructor(type) {
        this.type = type
    }
    connect() {

    }
}*/

function generateMap(size, floorNum) {/*
    // generates a basic grid
    size = Math.floor(size * (Math.random() * 0.4 + 0.8)) * 2
    mazeSize = Math.floor(size * (Math.random() * 0.4 + 0.8)) * 2
    let map = []
    for (let i = 0; i < mazeSize + 1; i++) {
        map.push([])
        for (let j = 0; j < mazeSize + 1; j++) {
            map[i][j] = 0
        }
    }
    console.log(map)
    console.log("\n=== DIVIDER ===\n")

    let x = 1
    let y = 1
    let visitedCells = [[x, y]]
    let adjWalls = [[x+1, y], [x, y+1]]
    map[x][y] = 2

    // randomized prim's algorithm
    for (let i = 0; i < Math.pow(size, 2); i++) {
        const visitedWallNum = Math.floor(Math.random() * adjWalls.length)
        const visit = adjWalls[visitedWallNum]

        let isVisited = [false, false, false, false]
        let unvisitedNeighbor = 2
        for (let j = 0; j < visitedCells.length; j++) {
            // adjacent horizontally
            if (visit[0] === visitedCells[j][0] - 1 && visit[1] === visitedCells[j][1]) {
                isVisited[0] = true
                unvisitedNeighbor = [visit[0]-1, visit[1]]
            } else if (visit[0] === visitedCells[j][0] + 1 && visit[1] === visitedCells[j][1]) {
                isVisited[1] = true
                unvisitedNeighbor = [visit[0]+1, visit[1]]
            }
            // adjacent vertically
            else if (visit[0] === visitedCells[j][0] && visit[1] === visitedCells[j][1] - 1) {
                isVisited[2] = true
                unvisitedNeighbor = [visit[0], visit[1]-1]
            } else if (visit[0] === visitedCells[j][0] && visit[1] === visitedCells[j][1] + 1) {
                isVisited[3] = true
                unvisitedNeighbor = [visit[0], visit[1]+1]
            }
        }

        // if the wall properly divides a visited cell and an unvisited cell:
        if (isVisited[0] !== isVisited[1] || isVisited[2] !== isVisited[3]) {
            let neighborWalls = [
                [unvisitedNeighbor[0]+1, unvisitedNeighbor[1]], 
                [unvisitedNeighbor[0]-1, unvisitedNeighbor[1]], 
                [unvisitedNeighbor[0], unvisitedNeighbor[1]+1], 
                [unvisitedNeighbor[0], unvisitedNeighbor[1]-1]
            ]
            map[visit[0]][visit[1]] = 1
            map[unvisitedNeighbor[0]][unvisitedNeighbor[1]] = 2

            // removing duplicate walls
            for (let j = 0; j < adjWalls.length; j++) {
                if (unvisitedNeighbor[1] === adjWalls[j][1]) {
                    if (unvisitedNeighbor[0] + 1 === adjWalls[j][0]) {
                        neighborWalls.splice(0, 1)
                    } else if (unvisitedNeighbor[0] - 1 === adjWalls[j][0]) {
                        neighborWalls.splice(1, 1)
                    }
                    adjWalls.splice(j, 1)
                } else if (unvisitedNeighbor[0] === adjWalls[j][0]) {
                    if (unvisitedNeighbor[1] + 1 === adjWalls[j][1]) {
                        neighborWalls.splice(2, 1)
                    } else if (unvisitedNeighbor[1] - 1 === adjWalls[j][1]) {
                        neighborWalls.splice(3, 1)
                    }
                    adjWalls.splice(j, 1)
                }
            }
            adjWalls.push(...neighborWalls)
            visitedCells.push(unvisitedNeighbor)
        }
    }
    console.log(map)*/
    // im lazy and the previous mazegen code didn't work so i'm hardcoding it for now
    let map = [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,2,1,2,0,2,1,2,1,2,0],
        [0,0,0,1,0,0,0,1,0,0,0],
        [0,2,1,2,0,2,1,2,0,2,0],
        [0,1,0,0,0,0,0,1,0,1,0],
        [0,2,1,2,1,2,0,2,1,2,0],
        [0,0,0,1,0,1,0,1,0,0,0],
        [0,2,1,2,0,2,1,2,1,2,0],
        [0,1,0,1,0,1,0,0,0,1,0],
        [0,2,0,2,0,2,1,2,0,2,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ]
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let roomType = Math.random() * (21 - floorNum)
            if (roomType < 3) { // treasure
                map[i*2+1][j*2+1] = 3
            } else if (roomType < 4) { // shop
                map[i*2+1][j*2+1] = 4
            } else if (roomType < 14) { // enemy
                map[i*2+1][j*2+1] = 5
            } // empty otherwise
        }
    }
    // set starting/ending rooms
    map[1][1] = 6
    map[map.length - 2][map.length - 2] = 7

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
    return map
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
    const map = generateMap(5, 1)
}

console.log("\nit's time for our trials to begin.")
setTimeout(() => {
    console.log("let's see how far we can get.")
    setTimeout(() => { prompt("hit enter to begin. ")
    game() }, 500)
}, 500)