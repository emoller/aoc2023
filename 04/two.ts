const input: string = Deno.readTextFileSync(
    '/Users/emoller/src/aoc2023/04/input.txt'
)

const answer = input
    .split('\n')
    .map((r) => {
        return {
            num: 1,
            wins: 0,
            card: r
                .split(':')[1]
                .trim()
                .split('|')
                .map((n) =>
                    n
                        .split(' ')
                        .map((n) => n.trim())
                        .filter((n) => n.length)
                ),
        }
    })
    .map((c) => {
        c.wins = c.card[0].reduce(
            (p, curr) => p + (c.card[1].includes(curr) ? 1 : 0),
            0
        )
        return c
    })

for (let i = 0; i < answer.length; ++i) {
    for (let j = 1; j <= answer[i].wins && i + j < answer.length; ++j) {
        answer[i + j].num += answer[i].num
    }
}

console.log(answer.reduce((p, c) => p + c.num, 0))
