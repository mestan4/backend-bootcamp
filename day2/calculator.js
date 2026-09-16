// Reading arguments passed from the terminal
// process.argv[0] is the Node.js path
// process.argv[1] is the file path
// The user inputs start from index 2

const args = process.argv.slice(2);

const operation = args[0]; // 'add', 'subtract', 'multiply', 'divide'

const num1 = parseFloat(args[1]);
const num2 = parseFloat(args[2]);

// Validate inputs
if (!operation || isNaN(num1) || isNaN(num2)) {
  console.log('Usage: node calculator.js <operation> <num1> <num2>');
  console.log('Example: node calculator.js add 10 5');
  process.exit(1);
}

let result;
// Perform the calculation based on the operation
switch (operation) {
  case 'add':
    result = num1 + num2;
    break;
  case 'subtract':
    result = num1 - num2;
    break;
  case 'multiply':
    result = num1 * num2;
    break;
  case 'divide':
    result = num2 !== 0 ? num1 / num2 : 'Error: Division by zero!';
    break;
  default:
    result = 'Invalid operation! Use add, subtract, multiply, or divide.';
}

console.log(`Input: ${num1} and ${num2}`);
console.log(`Operation: ${operation}`);
console.log(`Result: ${result}`);