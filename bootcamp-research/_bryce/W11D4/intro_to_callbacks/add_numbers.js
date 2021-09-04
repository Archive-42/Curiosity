const readline = require('readline')

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function addNumbers(sum, numsLeft, completionCallback) {
    if (numsLeft > 0) {
        reader.question("Enter a number", function(res) {
            const number = parseInt(res);
            sum += number;
            console.log(sum);
            addNumbers(sum, numsLeft - 1, completionCallback)
          });
    }
    if (numsLeft === 0) {
      reader.close();
      return completionCallback(sum);
    }
}

addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));