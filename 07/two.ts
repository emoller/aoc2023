type Hand = {
    cards: string[]
    bet: number
    htype: number
    sortcode: number
    jokers: number
}

const cardhisto = (s: string) => {
    const counts: number[] = []
    let a = s.split('')
    while (a.length) {
        const c = a.shift()!
        if (c == 'J') continue
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
    return h.length == 2 && h[0] == 3 && h[1] == 2
}

const threeofakind = (s: string) => {
    const h = cardhisto(s)
    return h[0] == 3 && (h.length == 1 || h[1] == 1)
}

const twopair = (s: string) => {
    const h = cardhisto(s)
    return h.length > 1 && h[0] == 2 && h[1] == 2
}

const onepair = (s: string) => cardhisto(s)[0] == 2

const highcard = (s: string) => cardhisto(s)[0] == 1

const checks = [
    highcard, // 0
    onepair, // 1
    twopair, // 2
    threeofakind, // 3
    fullhouse, // 4
    fourofakind, // 5
    fiveofakind, // 6
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
                            ? 1
                            : c == 'T'
                            ? 11
                            : 1 + parseInt(c)),
                    0
                ),
            jokers: h[0].split('J').length - 1,
        }
    })
    .map((h) => {
        switch (h.jokers) {
            case 0:
                return h
            case 1:
                h.htype =
                    h.htype == 5 // QQQQ -> QQQQQ
                        ? 6
                        : h.htype == 3 // QQQ -> QQQQ
                        ? 5
                        : h.htype == 2 // KKQQ -> KKKQQ
                        ? 4
                        : h.htype == 1 // QQ -> QQQ
                        ? 3
                        : 1 // Q -> QQ
                return h
            case 2:
                h.htype =
                    h.htype == 3 // QQQ -> QQQQQ
                        ? 6
                        : h.htype == 1 // QQ -> QQQQ
                        ? 5
                        : 3 // Q -> QQQ
                return h
            case 3:
                h.htype =
                    h.htype == 1 // QQ -> QQQQQ
                        ? 6
                        : 5 // Q -> QQQQ
                return h
            default:
                h.htype = 6
                return h
        }
    })
    .sort((a, b) =>
        a.htype == b.htype ? a.sortcode - b.sortcode : a.htype - b.htype
    )

console.log(input.reduce((p, c, i) => p + c.bet * (i + 1), 0))
