const input = Deno.readTextFileSync('/Users/emoller/src/aoc2023/11/input.txt')
    .split('\n')
    .map((r) => r.split(''))

const exp = 999999

type Vec = { x: number; y: number }
const galaxies: Vec[] = []
input.forEach((row, y) =>
    row.forEach((ch, x) => {
        if (ch == '#') galaxies.push({ x, y })
    })
)

let expansion = 0
for (let r = 0; r < input.length; ++r) {
    if (input[r].every((p) => p == '.')) {
        galaxies.map((g) => {
            g.y = g.y + (g.y > r + expansion ? exp : 0)
            return g
        })
        expansion += exp
    }
}

expansion = 0
for (let c = 0; c < input[0].length; ++c) {
    if (input.every((r) => r[c] == '.')) {
        galaxies.map((g) => {
            g.x = g.x + (g.x > c + expansion ? exp : 0)
            return g
        })
        expansion += exp
    }
}

const num = galaxies.reduce(
    (p, c, i) =>
        p +
        galaxies.reduce(
            (pp, cc, j) =>
                pp + (j > i ? Math.abs(cc.x - c.x) + Math.abs(cc.y - c.y) : 0),
            0
        ),
    0
)

console.log(num)
