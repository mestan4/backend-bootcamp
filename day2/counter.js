// A simple counter script that runs in Node.js

let count = 0;

console.log('--- Counter Started ---');

// Run this block every 1000 milliseconds (1 second)
const timer = setInterval(() => {
    count += 1;
    console.log(`Current Count: ${count}`);

    // Stop the interval when the counter reaches 5
    if (count === 5) {
        clearInterval(timer);
        console.log('--- Counter Finished ---');
    
    }
},1000 );