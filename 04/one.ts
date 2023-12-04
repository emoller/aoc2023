const input: string = Deno.readTextFileSync(
    '/Users/emoller/src/aoc2023/04/input.txt'
)

const answer = input
    .split('\n')
    .map((r) =>
        r
            .split(':')[1]
            .trim()
            .split('|')
            .map((n) =>
                n
                    .split(' ')
                    .map((n) => n.trim())
                    .filter((n) => n.length)
            )
    )
    .reduce((sum, row) => {
        const wins = row[0].reduce(
            (p, c) => p + (row[1].includes(c) ? 1 : 0),
            0
        )
        return sum + (wins > 0 ? Math.pow(2, wins - 1) : 0)
    }, 0)

console.log(answer)
