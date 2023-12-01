let input: string = Deno.readTextFileSync("input.txt");

const nums = [/one/g, /two/g, /three/g, /four/g, /five/g, /six/g, /seven/g, /eight/g, /nine/g];
let replacements:{idx:number,val:string}[] = [];
nums.forEach((r, i) => {
  let num = r.exec(input);
  while (num) {
    replacements.push({idx: num.index, val: (i + 1).toString()});
    num = r.exec(input);
  }
});
let arr = input.split('');
replacements.forEach(r => arr[r.idx] = r.val);
input = arr.join('');

let answer = input
  .split("\n")
  .map((x) => x.split("").filter((y) => /[0-9]/.test(y)))
  .map((z) => 10 * parseInt(z[0]) + parseInt(z[z.length - 1]))
  .reduce((a, b) => a + b, 0);

console.log(answer);
