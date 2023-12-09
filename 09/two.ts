const input = Deno.readTextFileSync('/Users/emoller/src/aoc2023/09/input.txt')
    .split('\n')
    .map((row) => row.split(' ').map((v) => parseInt(v)))

const getderivs = (x: number[]) => {
    const derivs: number[][] = []
    derivs.push(x)
    let row = x
    while (row.some((v) => v)) {
        const deriv = row.map((v, i) => (i ? v - row[i - 1] : 0)).splice(1)
        derivs.push(deriv)
        row = deriv
    }
    return derivs
}

const extrapolate = (x: number[][]) => {
    x.reverse()
    x.map((row, i) => {
        if (i) {
            row.push(row[row.length - 1] + x[i - 1].at(-1)!)
        }
        return row
    })
    return x
}

input.forEach((y) => y.reverse())

console.log(
    input
        .map((i) => extrapolate(getderivs(i)))
        .reduce((p, c) => p + c.at(-1)!.at(-1)!, 0)
)
