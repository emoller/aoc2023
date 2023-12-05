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

// let rr: Range[] = [
//     { low: 1, high: 10 },
//     { low: 5, high: 6 },
//     { low: 3, high: 15 },
//     { low: 20, high: 25 },
// ]
// console.log(mergeRanges(rr))

const str = input.split('\n')
const seedstr = str[0].split(': ')[1].split(' ')
let seeds: Range[] = []
for (let j = 0; j < seedstr.length; j += 2) {
    seeds.push({
        low: parseInt(seedstr[j]),
        high: parseInt(seedstr[j]) + parseInt(seedstr[j + 1]),
    })
}
seeds = sortRanges(seeds)

str.shift()
let mappings: Mapping[][] = []
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

const splitSeeds = (seed: Range, mapping: Mapping) => {
    let newseeds: Range[] = []
    if (seed.low < mapping.range.low) {
        newseeds.push({
            low: seed.low,
            high: Math.min(seed.high, mapping.range.low),
        })
    }
    if (seed.high > mapping.range.high) {
        newseeds.push({
            low: Math.max(mapping.range.high, seed.low),
            high: seed.high,
        })
    }
    if (seed.high > mapping.range.low && seed.low < mapping.range.high) {
        const low = Math.max(seed.low, mapping.range.low)
        const high = Math.min(seed.high, mapping.range.high)
        newseeds.push({
            low: low + mapping.offset,
            high: high + mapping.offset,
        })
    }
    return newseeds
}

const applymapping = (seeds: Range[], mappings: Mapping[]) => {
    let newseeds: Range[] = []
    seeds.forEach((s) => {
        mappings.forEach((m) => {
            const tmp = splitSeeds(s, m)
            newseeds = newseeds.concat(tmp)
            newseeds = mergeRanges(newseeds)
        })
    })
    return newseeds
}

console.log(mappings)
console.log(seeds)

let currseeds: Range[] = seeds
mappings.forEach((mrow) => {
    currseeds = applymapping(currseeds, mrow)
    console.log(currseeds)
})

//currseeds = sortRanges(currseeds)

//console.log(currseeds)
