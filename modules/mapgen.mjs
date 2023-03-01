let map = []

function areCoordsEqual(xy1, xy2) {
    if (xy1[0] === xy2[0] && xy1[1] === xy2[1]) {
        return true
    }
    return false
}

function setRooms() {
    for (let i = 1; i < map.length; i += 2) {
        for (let j = 1; j < map[0].length; j += 2) {
            const rand = Math.random()

            if (rand < 0.4) {
                map[i][j] = 5
            } else if (rand < 0.45) {
                map[i][j] = 6
            } else if (rand < 0.5) {
                map[i][j] = 7
            } else if (rand < 0.6) {
                map[i][j] = 8
            }
        }
    }
    map[1][1] = 3
    map[map.length-2][map[0].length-2] = 4
}

function generateMap(size) {
    size = size * 2 + 1
    let unvisitedCells = []

    // generate a matrix
    for (let i = 0; i < size; i++) {
        map[i] = []
        for (let j = 0; j < size; j++) {
            map[i][j] = 0
        }
    }

    for (let i = 1; i < size; i += 2) {
        for (let j = 1; j < size; j += 2) {
            unvisitedCells[Math.floor((i - 1) / 2 * (size - 1) / 2 + (j - 1) / 2)] = [i, j]
        }
    }

    // initial values
    let start = [1,1]
    let end = [map.length-2, map[0].length-2]
    let visiting = [1,1]
    let walk = [[1,1]]

    while (unvisitedCells[0]) {
        // loop-erased random walk
        while (!areCoordsEqual(visiting, end)) {
            const rand = Math.random()

            // randomly walking
            if (rand < 0.25) {
                visiting = [walk[walk.length-1][0] + 2, walk[walk.length-1][1]]
                if (visiting[0] < map[0].length) {
                    walk.push([visiting[0]-1, visiting[1]])
                    walk.push(visiting)
                }
            } else if (rand < 0.5) {
                visiting = [walk[walk.length-1][0], walk[walk.length-1][1] + 2]
                if (visiting[1] < map[1].length) {
                    walk.push([visiting[0], visiting[1]-1])
                    walk.push(visiting)
                }
            } else if (rand < 0.75) {
                visiting = [walk[walk.length-1][0] - 2, walk[walk.length-1][1]]
                if (visiting[0] > 0) {
                    walk.push([visiting[0]+1, visiting[1]])
                    walk.push(visiting)
                }
            } else {
                visiting = [walk[walk.length-1][0], walk[walk.length-1][1] - 2]
                if (visiting[1] > 0) {
                    walk.push([visiting[0], visiting[1]+1])
                    walk.push(visiting)
                }
            }

            // destroy loops
            for (let i = 0; i < walk.length - 1; i += 2) {
                if (areCoordsEqual(walk[i], walk[walk.length-1])) {
                    for (let j = walk.length - 1; j > i; j--) {
                        walk.pop()
                    }
                }
            }
            if (map[walk[walk.length-1][0]][walk[walk.length-1][1]] === 2) {
                break
            }
        }

        // make changes to map (and unvisited cells)
        for (let i = 0; i < walk.length; i++) {
            if (walk[i][0] % 2 === 0 || walk[i][1] % 2 === 0) {
                map[walk[i][0]][walk[i][1]] = 1
            } else {
                map[walk[i][0]][walk[i][1]] = 2
            }
            // if walk and unvisitedcells share elements, remove them from unvisitedCells
            for (let j = 0; j < unvisitedCells.length; j++) {
                if (areCoordsEqual(walk[i], unvisitedCells[j])) {
                    unvisitedCells.splice(j, 1)
                }
            }
        }

        // update variables for next pass
        start = unvisitedCells[Math.floor(Math.random() * unvisitedCells.length)]
        end = walk[Math.floor(Math.random() * walk.length / 2) * 2]
        //console.log(walk)
        //console.log(unvisitedCells)
        visiting = start
        walk = [start]
        //displayMap()
        //console.log(`s: ${start}`)
        //console.log(`e: ${end}`)
    }
    setRooms()

    return map
}

export {generateMap}