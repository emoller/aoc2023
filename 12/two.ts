type Row = {
    str: string
    num: number[]
}

let input: Row[] = Deno.readTextFileSync(
    '/Users/emoller/src/aoc2023/12/input.txt'
)
    .split('\n')
    .map((r) => r.split(' '))
    .map((r) => {
        return { str: r[0], num: r[1].split(',').map((n) => parseInt(n)) }
    })

input = input.map((r) => {
    let str = r.str
    let num: number[] = r.num
    for (let i = 0; i < 4; ++i) {
        str = str + '?' + r.str
        num = num.concat(r.num)
    }
    return { str, num }
})

const memoize = <Arguments extends unknown[], ReturnVal>(
    func: (...args: Arguments) => ReturnVal
): ((...args: Arguments) => ReturnVal) => {
    const memo = new Map<string, ReturnVal>()

    return (...args) => {
        const k = args.join()
        if (memo.has(k)) return memo.get(k)!
        const result = func(...args)
        memo.set(k, result)
        return result
    }
}

const countvalid = memoize((str: string, counts: number[]): number => {
    if (str.length == 0) return counts.length === 0 ? 1 : 0

    if (counts.length == 0) {
        for (let i = 0; i < str.length; i++) if (str[i] == '#') return 0
        return 1
    }

    if (str.length < counts.reduce((p, c) => p + c, 0) + counts.length - 1)
        return 0

    if (str[0] === '.') {
        return countvalid(str.slice(1), counts)
    } else if (str[0] === '#') {
        const [run, ...remaining] = counts
        for (let i = 0; i < run; i++) {
            if (str[i] === '.') return 0
        }
        if (str[run] === '#') return 0

        return countvalid(str.slice(run + 1), remaining)
    } else {
        return (
            countvalid('#' + str.slice(1), counts) +
            countvalid('.' + str.slice(1), counts)
        )
    }
})

console.log(
    input.map((i) => countvalid(i.str, i.num)).reduce((p, c) => p + c, 0)
)
