// Drill 1

const express = require('express');
const morgan = require('morgan');

const app = express(); // starts express app
app.use(morgan('common')); // app.use is how you inject middleware 

app.get('/sum', (req, res) => { // function that receive two parameters. 1st is path. 2nd is function when someone reaches that path
  const {
    a,
    b
  } = req.query; // taking query string from URL
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  //Validation

  if (typeof numA !== 'number' || typeof numB !== 'number') {
    return res.status(400).send('Please enter a valid number');
  }

  const c = numA + numB;
  const equation = `The sum of ${numA} and ${numB} equals ${c}`;

  res.send(equation);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});


// Drill 2 

app.get('/cipher', (req, res) => {
  const {
    text,
    shift
  } = req.query;

  const letters = text.split(""); // split array into an array of substrings
  const result = letters.map(letter => { // map over each substring.   
    const number = letter.charCodeAt(0); // find Unicode of each character 
    const newNumber = number + parseInt(shift); // Unicode # + shift increment 
    return String.fromCharCode(newNumber); // converts Unicode values into characters 
  });
  const finalResult = result.join(""); // join characters 
  res.send(finalResult); // send to cilent 
});

// 1. Get number 2. Increase by shift 3. From the number, take the letter

// Drill 3

app.get('/lotto', (req, res) => {
  const { numbers } = req.query;

  // Validation 

  if (!numbers) {
    return res.status(400).send('numbers is required'); 
  }

  if (!Array.isArray(numbers)) {
    return res.status(400).send('numbers must be an array');
  }

  const guesses = numbers.map(n => parseInt(n).filter(n => !Number.isNaN(n) && n >= 1 && n <= 20));

  if(guesses.length !== 6) {
    return res.send(400).send('numbers must contain 6 integers between1 and 20');
  }

  // The function then randomly generates 6 numbers between 1 and 20.

  // Compare the numbers sent in the query with the randomly generated numbers to determine how many match

  // If fewer than 4 numbers match respond with the string "Sorry, you lose".

  // .If 4 numbers match respond with the string "Congratulations, you win a free ticket",

  //  If 5 numbers match respond with "Congratulations! You win $100!"

  // .If all 6 numbers match respond with "Wow! Unbelievable! You could have won the mega millions!".

  let diff = winningNumbers.filter(n => !guesses.includes(n));

  // construct a response
  let responseText;

  switch(diff.length){
    case 0: 
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:   
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';  
  }


  // uncomment below to see how the results ran

  // res.json({
  //   guesses,
  //   winningNumbers,
  //   diff,
  //   responseText
  // });

  res.send(responseText);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');

});


