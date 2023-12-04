const input: string = Deno.readTextFileSync(
    '/Users/emoller/src/aoc2023/03/input.txt'
)

const nums: { row: number; start: number; end: number; id: number }[] = []
const syms: { x: number; y: number }[] = []
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
            syms.push({ x: i, y: row })
            ++i
        }
    }
})
const answer = nums
    .filter((n) =>
        syms.reduce(
            (p, c) =>
                p ||
                (Math.abs(c.y - n.row) < 2 &&
                    (Math.abs(c.x - n.start) < 2 || Math.abs(c.x - n.end) < 2)),
            false
        )
    )
    .reduce((p, c) => p + c.id, 0)

console.log(answer)
