const input = Deno.readTextFileSync('/Users/emoller/src/aoc2023/11/input.txt')
    .split('\n')
    .map((r) => r.split(''))

for (let r = 0; r < input.length; ++r) {
    if (input[r].every((p) => p == '.')) {
        input.splice(r - 1, 0)
    }
}
