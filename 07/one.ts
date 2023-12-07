type Hand = {
    cards: string[]
    bet: number
    htype: number
    sortcode: number
}

const cardhisto = (s: string) => {
    const counts: number[] = []
    const a = s.split('')
    while (a.length) {
        const c = a.shift()!
        let n = 1
        for (let j = 0; j < a.length; ) {
            if (a[j] == c) {
                a.splice(j, 1)
                ++n
            } else {
                ++j
            }
        }
        counts.push(n)
    }
    return counts.sort((a, b) => b - a)
}

const fiveofakind = (s: string) => cardhisto(s)[0] == 5

const fourofakind = (s: string) => cardhisto(s)[0] == 4

const fullhouse = (s: string) => {
    const h = cardhisto(s)
    return h.length == 2 && h[0] == 3
}

const threeofakind = (s: string) => {
    const h = cardhisto(s)
    return h.length == 3 && h[0] == 3 && h[1] == 1
}

const twopair = (s: string) => {
    const h = cardhisto(s)
    return h.length == 3 && h[0] == 2 && h[1] == 2
}

const onepair = (s: string) => cardhisto(s).length == 4

const highcard = (s: string) => cardhisto(s).length == 5

const checks = [
    highcard,
    onepair,
    twopair,
    threeofakind,
    fullhouse,
    fourofakind,
    fiveofakind,
]

const input = Deno.readTextFileSync('/Users/emoller/src/aoc2023/07/input.txt')
    .split('\n')
    .map((x) => x.split(' '))
    .map((h) => {
        return {
            cards: h[0],
            bet: parseInt(h[1]),
            htype: checks.reduce((p, c, i) => (c(h[0]) ? i : p), 0),
            sortcode: h[0]
                .split('')
                .reduce(
                    (p, c) =>
                        p * 16 +
                        (c == 'A'
                            ? 14
                            : c == 'K'
                            ? 13
                            : c == 'Q'
                            ? 12
                            : c == 'J'
                            ? 11
                            : c == 'T'
                            ? 10
                            : parseInt(c)),
                    0
                ),
        }
    })
    .sort((a, b) =>
        a.htype == b.htype ? a.sortcode - b.sortcode : a.htype - b.htype
    )

console.log(input.reduce((p, c, i) => p + c.bet * (i + 1), 0))
