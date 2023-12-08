type Node = {
    left: string
    right: string
}
const map = new Map<string, Node>()

const input = Deno.readTextFileSync(
    '/Users/emoller/src/aoc2023/08/input.txt'
).split('\n')
const instructions = input[0].split('')
input.shift()
input.shift()

input.forEach((x) => {
    const m = x.match(/([A-Z0-9]+) = \(([A-Z0-9]+), ([A-Z0-9]+)\)/)
    map.set(m![1], { left: m![2], right: m![3] })
})

const pos = Array.from(map.keys()).filter((k) => k[2] == 'A')

const loops = pos.map((p) => {
    let j = 0
    while (p[2] != 'Z') {
        const dir = instructions[j % instructions.length]
        p = dir == 'L' ? map.get(p)!.left : map.get(p)!.right
        ++j
    }
    return j
})

const sums = Array(loops.length).fill(0)
do {
    let lowidx = 0
    sums.forEach((x, i) => {
        if (x < sums[lowidx]) lowidx = i
    })
    sums[lowidx] += loops[lowidx]
} while (sums.some((s) => s != sums[0]))

console.log(sums)
