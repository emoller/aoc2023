let text: String = Deno.readTextFileSync('input.txt')

text = text
    .split('')
    .map((x) => x + ' ')
    .join('')

console.log(text)
