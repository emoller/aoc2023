const input: string = Deno.readTextFileSync(
    '/Users/emoller/src/aoc2023/03/input.txt'
)

const nums: { row: number; start: number; end: number; id: number }[] = []
const syms: { x: number; y: number; sym: string }[] = []
input.split('\n').forEach((str, row) => {
    const ch = str.split('')
    for (let i = 0; i < ch.length; ) {
        if (/[1-9]/.test(ch[i])) {
            nums.push({ row, start: i, end: i, id: parseInt(ch[i]) })
            for (i++; i < ch.length && /[0-9]/.test(ch[i]); ++i) {
                nums[nums.length - 1].end++
                nums[nums.length - 1].id =
                    nums[nums.length - 1].id * 10 + parseInt(ch[i])
            }
        } else if (ch[i] == '.') {
            ++i
        } else {
            syms.push({ x: i, y: row, sym: ch[i] })
            ++i
        }
    }
})
const answer = syms
    .filter((s) => s.sym == '*')
    .filter((s) => {
        const adjacent = nums.reduce((p, c) => {
            return Math.abs(s.y - c.row) < 2 &&
                (Math.abs(s.x - c.start) < 2 || Math.abs(s.x - c.end) < 2)
                ? p + 1
                : p
        }, 0)
        return adjacent == 2
    })
    .reduce(
        (p, c) =>
            p +
            nums.reduce(
                (np, nc) =>
                    (Math.abs(c.y - nc.row) < 2 &&
                    (Math.abs(c.x - nc.start) < 2 || Math.abs(c.x - nc.end) < 2)
                        ? nc.id
                        : 1) * np,
                1
            ),
        0
    )

console.log(answer)
