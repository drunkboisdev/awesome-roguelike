"use strict"

import * as Map from "./modules/mapgen.mjs"
import PromptSync from "prompt-sync" // i have no idea how this works and i'm too scared to ask
const prompt = PromptSync() // "esm default" "commonjs" "module.export()" none of these words are in the bible
// TIME SPENT: 8 HOURS

function game() {
    console.log("hi")
    const map = Map.generateMap(5)
    Map.displayMap()
}

console.log("\nit's time for our trials to begin.")
setTimeout(() => {
    console.log("let's see how far we can get.")
    setTimeout(() => { prompt("hit enter to begin. ")
    game() }, 500)
}, 500)