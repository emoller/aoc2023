const input: string = Deno.readTextFileSync('input.txt')

const parsed = input.split('\n').map((x) =>
    x
        .split(':')[1]
        .split(';')
        .map((y) => y.split(',').map((z) => z.trimStart().split(' ')))
)

const answer = parsed
    .map((game) => {
        const cols: { [index: string]: number } = { red: 0, green: 0, blue: 0 }
        game.forEach((x) => {
            x.forEach(
                (y) => (cols[y[1]] = Math.max(cols[y[1]], parseInt(y[0])))
            )
        })
        return cols
    })
    .reduce((p, c) => p + c.red * c.green * c.blue, 0)

console.log(answer)
