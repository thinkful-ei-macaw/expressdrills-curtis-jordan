// Drill 1

const express = require('express');
const morgan = require('morgan')  ;

const app = express();
app.use(morgan('common'));

app.get('/sum', (req, res) => {
  const { a , b } = req.query;
  const numA = parseFloat(a);
  const numB = parseFloat(b);


  if(typeof a !== Number || typeof b !== Number) {
    return res.status(400).send('Please enter a valid number');
  }

  const c = numA + numB;
  const equation = `The sum of ${numA} and ${numB} equals ${c}`;

  res.send(equation);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});

