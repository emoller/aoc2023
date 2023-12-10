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

const edges: number[][] = new Array(input.length)
    .fill(0)
    .map((x) => new Array(input[0].length).fill(0))

const step = (p: Pos, last: Pos) => {
    const d = dirs.get(input[p.y][p.x])!
    if (last.x != p.x + d[0].x || last.y != p.y + d[0].y)
        return { x: p.x + d[0].x, y: p.y + d[0].y }
    else return { x: p.x + d[1].x, y: p.y + d[1].y }
}

let length = 0
let last = pos
do {
    edges[last.y][last.x] =
        input[last.y][last.x] == '-' ||
        input[last.y][last.x] == 'F' ||
        input[last.y][last.x] == '7' ||
        input[last.y][last.x] == 'S'
            ? 2
            : 1
    const tmp = step(pos, last)
    last = pos
    pos = tmp
    ++length
} while (input[pos.y][pos.x] != 'S')
edges[last.y][last.x] =
    input[last.y][last.x] == '-' ||
    input[last.y][last.x] == 'F' ||
    input[last.y][last.x] == '7' ||
    input[last.y][last.x] == 'S'
        ? 2
        : 1

let enclosed = 0
edges.forEach((y, yi) =>
    y.forEach((x, xi) => {
        if (x == 0) {
            let e = 0
            let tmp = xi
            while (tmp < y.length) {
                if (y[tmp] == 1) ++e
                ++tmp
            }
            if (e % 2) {
                ++enclosed
                input[yi][xi] = '*'
            }
        }
    })
)

console.log(enclosed)
