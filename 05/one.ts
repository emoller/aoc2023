const input: string = Deno.readTextFileSync(
    '/Users/emoller/src/aoc2023/05/input.txt'
)

const str = input.split('\n')
const seeds = str[0]
    .split(': ')[1]
    .split(' ')
    .map((s) => parseInt(s))
str.shift()
const mappings: string[][] = []
while (str.length) {
    str.shift()
    const mapping: string[] = []
    str.shift()
    while (str.length && str[0] != '') {
        mapping.push(str.shift()!)
    }
    mappings.push(mapping)
}
const nmappings = mappings.map((r) =>
    r.map((s) => s.split(' ').map((v) => parseInt(v)))
)

console.log(
    seeds
        .map((s) => {
            let tmp = s
            nmappings.forEach((mrow) => {
                for (let k = 0; k < mrow.length; ++k) {
                    const m = mrow[k]
                    if (tmp >= m[1] && tmp < m[1] + m[2]) {
                        tmp = tmp + m[0] - m[1]
                        break
                    }
                }
            })
            return tmp
        })
        .reduce((p, c) => Math.min(p, c), Number.MAX_VALUE)
)
