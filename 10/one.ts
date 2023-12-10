const input = Deno.readTextFileSync('/Users/emoller/src/aoc2023/10/input.txt')
    .split('\n')
    .map((r) => r.split(''))

type Pos = { x: number; y: number }
let pos: Pos = { x: -1, y: -1 }

for (let y = 0; y < input.length && pos.x == -1; ++y)
    for (let x = 0; x < input[0].length; ++x)
        if (input[y][x] == 'S') {
            pos = { x, y }
            break
        }

const dirs = new Map<string, Pos[]>()
dirs.set('|', [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
])
dirs.set('-', [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
])
dirs.set('L', [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
])
dirs.set('J', [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
])
dirs.set('7', [
    { x: -1, y: 0 },
    { x: 0, y: 1 },
])
dirs.set('F', [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
])

// Hardcode S
dirs.set('S', [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
])

const step = (p: Pos, last: Pos) => {
    const d = dirs.get(input[p.y][p.x])!
    if (last.x != p.x + d[0].x || last.y != p.y + d[0].y)
        return { x: p.x + d[0].x, y: p.y + d[0].y }
    else return { x: p.x + d[1].x, y: p.y + d[1].y }
}

let length = 0
let last = pos
do {
    const tmp = step(pos, last)
    last = pos
    pos = tmp
    ++length
} while (input[pos.y][pos.x] != 'S')
console.log(length / 2)
