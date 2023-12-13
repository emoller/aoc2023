type Row = {
    str: string
    num: number[]
}

const input: Row[] = Deno.readTextFileSync(
    '/Users/emoller/src/aoc2023/12/input.txt'
)
    .split('\n')
    .map((r) => r.split(' '))
    .map((r) => {
        return { str: r[0], num: r[1].split(',').map((n) => parseInt(n)) }
    })

const getcounts = (str: string): number[] => {
    let i = 0
    const c: number[] = []
    while (i < str.length) {
        if (str.charAt(i) == '#') {
            let j = 0
            while (i < str.length && str.charAt(i) == '#') {
                j++
                i++
            }
            c.push(j)
        }
        ++i
    }
    return c
}

const isvalid = (c: number[], counts: number[]) => {
    return counts.join() == c.join()
}

const countvalid = (str: string, counts: number[]): number => {
    const q = str.indexOf('?')
    if (q != -1) {
        return (
            countvalid(str.slice(0, q) + '#' + str.slice(q + 1), counts) +
            countvalid(str.slice(0, q) + '.' + str.slice(q + 1), counts)
        )
    } else {
        return isvalid(getcounts(str), counts) ? 1 : 0
    }
}

console.log(
    input.map((i) => countvalid(i.str, i.num)).reduce((p, c) => p + c, 0)
)
