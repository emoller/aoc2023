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
    const m = x.match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/)
    map.set(m![1], { left: m![2], right: m![3] })
})

let j = 0
let pos = 'AAA'
while (pos != 'ZZZ') {
    if (instructions[j % instructions.length] == 'L') pos = map.get(pos)!.left
    else pos = map.get(pos)!.right
    ++j
}

console.log(j)
