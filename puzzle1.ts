const fs = require('node:fs/promises');

async function readPuzzle1() {
  try {
    const lines = await fs.readFile('./resources/puzzle1.txt', { encoding: 'utf8' });
    const sum = lines.split(/\r?\n/).reduce((total:number = 0, line: string) => {
      if (!line) {
        return total
      }

      // Find first number occurence in string
      const numbers = line.match(/\d/g)

      if (!numbers || numbers.length === 0) {
        return total
      }

      const firstNumber = parseInt(numbers[0])
      const lastNumber = parseInt(numbers[numbers.length - 1])

      console.log(firstNumber*10 + lastNumber)
      return total + (firstNumber*10) + lastNumber
    }, 0)

    console.log(sum)
  } catch (err) {
    console.log(err);
  }
}

readPuzzle1();
