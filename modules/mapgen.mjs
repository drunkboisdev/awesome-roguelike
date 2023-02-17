let map = []

function areCoordsEqual(xy1, xy2) {
    if (xy1[0] === xy2[0] && xy1[1] === xy2[1]) {
        return true
    }
    return false
}

function generateMap(size) {
    size = size * 2 + 1

    // generate a matrix
    for (let i = 0; i < size; i++) {
        map[i] = []
        for (let j = 0; j < size; j++) {
            map[i][j] = 0
        }
    }
    
    // wilson's algo
    // initial values
    let end = [map.length-2, map[0].length-2]
    let visiting = [1,1]
    let walk = [[1,1]]

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
        console.log(walk)

        // destroy loops
        for (let i = 0; i < walk.length - 1; i += 2) {
            if (areCoordsEqual(walk[i], walk[walk.length-1])) {
                for (let j = walk.length - 1; j > i; j--) {
                    walk.pop()
                }
            }
        }
    }

    return map
}

function displayMap() {
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

export {generateMap, displayMap}