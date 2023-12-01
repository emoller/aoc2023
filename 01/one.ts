let input: string = Deno.readTextFileSync('input.txt')

let answer = input
    .split('\n')
    .map((x) => x.split('').filter((y) => /[0-9]/.test(y)))
    .map((z) => 10 * parseInt(z[0]) + parseInt(z[z.length - 1]))
    .reduce((a, b) => a + b, 0)

console.log(answer)
