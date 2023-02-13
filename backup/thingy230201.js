const prompt = require("prompt-sync")()

/*class Room {
    constructor(type) {
        this.type = type
    }
    connect() {

    }
}*/

function generateMap(size) {
    // generates a basic grid
    size = Math.floor(size * (Math.random() * 0.4 + 0.8)) * 2
    mazeSize = Math.floor(size * (Math.random() * 0.4 + 0.8)) * 2
    let map = []
    for (let i = 0; i < mazeSize + 1; i++) {
        map.push([])
        for (let j = 0; j < mazeSize + 1; j++) {
            map[i][j] = "#"
        }
    }
    console.log(map)
    console.log("\n=== DIVIDER ===\n")

    // turns the grid into a maze
    // modified prim's algo:
    /*
        start with a grid full of walls
        pick a cell, add it to a maze list
        add adjacent cells to a cell list
        while there are cells in the cell list:
            pick a random cell
                randomly pick an adjacent maze cell to connect to <
                add the new cell's adjacent cells to the cell list
            remove the wall from the list
    */
    let x = 1
    let y = 1
    let visitedCells = [[x, y]]
    let adjCells = [[x+2, y, 0], [x, y+2, 0]]
    map[x][y] = " "

    // modified prim's algorithm
    for (let i = 0; i < Math.pow(size, 2); i++) {
        let visitedCellNum = Math.floor(Math.random() * adjCells.length)
        let visit = adjCells[visitedCellNum]

        map[visit[0]][visit[1]] = " "
        let passageX = (adjCells[visitedCellNum][0] + visitedCells[adjCells[visitedCellNum][2]][0]) / 2
        let passageY = (adjCells[visitedCellNum][1] + visitedCells[adjCells[visitedCellNum][2]][1]) / 2
        map[passageX][passageY] = "."

        visit.pop()
        visitedCells.push(visit)
        const index = adjCells.indexOf(visit)
        adjCells.splice(index, 1)

        x = visit[0]
        y = visit[1]

        if (x - 2 > 0) {
            adjCells.push([x-2, y, visitedCells.length-1])
        } if (x + 2 < size * 2) {
            adjCells.push([x+2, y, visitedCells.length-1])
        } if (y - 2 > 0) {
            adjCells.push([x, y-2, visitedCells.length-1])
        } if (y + 2 < size * 2) {
            adjCells.push([x, y+2, visitedCells.length-1])
        }
        console.log(visitedCells)
        console.log(adjCells)
    }
    console.log(map)
}

function game() {
    console.log("hi")
    generateMap(5)
}

console.log("\nbefore us lie five doors.")
setTimeout(() => {
    console.log("which one should we enter first?")
    setTimeout(() => { prompt("enter a number from 1-5 to begin. ")
    game() }, 800)
}, 800)