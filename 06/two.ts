const input: string = Deno.readTextFileSync(
    '/Users/emoller/src/aoc2023/06/input.txt'
)

type Race = {
    time: number
    distance: number
    wins: number[]
}

const str = input
    .split('\n')
    .map((s) => s.split(':')[1])
    .map((s) => s.replaceAll(' ', ''))
    .map((s) => parseInt(s))

const races: Race[] = [{ time: str[0], distance: str[1], wins: [] }]
races.forEach((race) => {
    for (let i = 1; i < race.time; ++i) {
        const dist = i * (race.time - i)
        if (dist > race.distance) {
            race.wins.push(i)
        }
    }
})

console.log(races.reduce((p, r) => p * r.wins.length, 1))
