let map = []

function generateMap(size) {
    size = size * 2 + 1

    for (let i = 0; i < size; i++) {
        map[i] = []
        for (let j = 0; j < size; j++) {
            map[i][j] = 0
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