function generateMap(size) {
    let map = []
    size = size * 2 + 1

    for (let i = 0; i < size; i++) {
        map[i] = []
        for (let j = 0; j < size; j++) {
            map[i][j] = 0
        }
    }
    return map
}

export {generateMap}