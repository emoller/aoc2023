const input: string = Deno.readTextFileSync(
    '/Users/emoller/src/aoc2023/05/input.txt'
)

type Range = {
    low: number
    high: number
}
type Mapping = {
    range: Range
    offset: number
}

const sortRanges = (r: Range[]) => r.sort((a, b) => a.low - b.low)

const mergeRanges = (r: Range[]) => {
    r = sortRanges(r)
    for (let i = 0; i < r.length; ++i) {
        while (i + 1 < r.length && r[i + 1].low <= r[i].high + 1) {
            r[i].high = Math.max(r[i].high, r[i + 1].high)
            r.splice(i + 1, 1)
        }
        if (r[i].low == r[i].high) r.splice(i, 1)
    }
    return r
}

const str = input.split('\n')
const seedstr = str[0].split(': ')[1].split(' ')
let seeds: Range[] = []
for (let j = 0; j < seedstr.length; j += 2) {
    seeds.push({
        low: parseInt(seedstr[j]),
        high: parseInt(seedstr[j]) + parseInt(seedstr[j + 1]) - 1,
    })
}
seeds = sortRanges(seeds)

str.shift()
const mappings: Mapping[][] = []
while (str.length) {
    str.shift()
    str.shift()
    let maps: Mapping[] = []
    while (str.length && str[0] != '') {
        const nums = str
            .shift()!
            .split(' ')
            .map((x) => parseInt(x))
        maps.push({
            range: { low: nums[1], high: nums[1] + nums[2] - 1 },
            offset: nums[0] - nums[1],
        })
    }
    maps.sort((a, b) => a.range.low - b.range.low)
    mappings.push(maps)
}

const applymapping = (seeds: Range[], mappings: Mapping[]) => {
    const remapped: Range[] = []
    const unmapped = seeds
    mappings.forEach((mapping) => {
        for (let j = 0; j < unmapped.length; ) {
            const seed = unmapped[j]
            if (
                seed.high < mapping.range.low ||
                seed.low > mapping.range.high
            ) {
                ++j
                continue
            }
            unmapped.splice(j, 1)
            if (seed.low < mapping.range.low) {
                unmapped.push({
                    low: seed.low,
                    high: Math.min(seed.high, mapping.range.low - 1),
                })
            }
            if (seed.high > mapping.range.high) {
                unmapped.push({
                    low: Math.max(mapping.range.high + 1, seed.low),
                    high: seed.high,
                })
            }
            if (
                seed.high > mapping.range.low &&
                seed.low < mapping.range.high
            ) {
                const low = Math.max(seed.low, mapping.range.low)
                const high = Math.min(seed.high, mapping.range.high)
                remapped.push({
                    low: low + mapping.offset,
                    high: high + mapping.offset,
                })
            }
        }
    })
    return mergeRanges(remapped.concat(unmapped))
}

let currseeds: Range[] = seeds
mappings.forEach((mrow) => {
    currseeds = applymapping(currseeds, mrow)
})

console.log(currseeds[0].low)
