"use strict"

import * as Map from "./modules/mapgen.mjs"
import PromptSync from "prompt-sync" // i have no idea how this works and i'm too scared to ask
const prompt = PromptSync() // "esm default" "commonjs" "module.export()" none of these words are in the bible
// TIME SPENT: 11 HOURS

let stats = {
    maxHP: 20
}

function game() {
    const map = Map.generateMap(16)
    Map.displayMap()
    let input = prompt("what do you want to do? ")
    while (input !== "quit") {
        switch (input) {
            case "stats":
                console.log("heyyyy")
                break
            default:
                console.log("that's not a valid command!")
        }
        input = prompt("what do you want to do? ")
    }
}

console.log("it's time for our trials to begin.")
setTimeout(() => {
    console.log("let's see how far we can get.")
    setTimeout(() => { prompt("hit enter to begin. ")
    game() }, 500)
}, 500)