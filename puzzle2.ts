const fs = require('node:fs/promises');

const numberMap: { [numberAsString: string]: number } = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
}

const convertNumber = (stringNr: string): number => {
  return numberMap[stringNr] || parseInt(stringNr)
}

async function readPuzzle1() {
  try {
    const lines = await fs.readFile('./resources/puzzle1.txt', { encoding: 'utf8' });
    const sum = lines.split(/\r?\n/).reduce((total:number = 0, line: string) => {
      if (!line) {
        return total
      }

      // Find all number occurrences in string. We need positive lookahead to make sure the regex does not consume the first
      // matching string. For instance, with string "twone", you want "two" and "one" to match. Positive lookahead makes sure
      // this is consumed in the right order. .match however doesn't work with positive lookahead, so matchAll is required.
      const allNumberMatches = line.matchAll(
        /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g
      );
      
      // Because MatchAll returns a RegExpStringIterator, we need to build it back to the strings found. These are always in the
      // 2nd element of an item, so first turn into array, then map it!
      const numbers = Array.from(allNumberMatches).map(match => match[1])

      if (!numbers || numbers.length === 0) {
        return total
      }

      const firstNumber = convertNumber(numbers[0]);
      const lastNumber = convertNumber(numbers[numbers.length - 1])

      // console.log(`Line: ${line}, First: ${firstNumber}, Last: ${lastNumber}`);
      return total + (firstNumber*10) + lastNumber
    }, 0)

    console.log(sum)
  } catch (err) {
    console.log(err);
  }
}

readPuzzle1();
