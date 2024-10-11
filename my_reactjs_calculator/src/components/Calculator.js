import React, { useState } from "react";
import Button from "./Button";
import Display from "./Display";


function Calculator() {
  const [value, setValue] = useState('');
  const [buffer, setBuffer] = useState('');
  const [operator, setOperator] = useState('');
  const [resultDisplayed, setResultDisplayed] = useState(false);

  const handleClick = (input) => {
    if (resultDisplayed && /\d|\./.test(input)) {
      if (/\./.test(input)) {
        setValue(value + input); // Continue input if next input is a decimal
      } else {
        setValue(input); // Replace if next input is another integer
      }
      setBuffer('');
      setOperator('');
      setResultDisplayed(false);
    } else if (/\d|\./.test(input)) {
      if (value === '0' && input === '.') {
        setValue('0.'); // If the placeholder is "0" and input is ".", continue as "0."
      } else if (value === '0') {
        setValue(input); // Replace "0" with the new input
      } else {
        setValue(value + input);
      }
    } else if (/[\+\-\*\/]/.test(input)) {
      if (buffer && value && !resultDisplayed) {
        const result = eval(`${buffer}${operator}${value}`);
        setBuffer(result.toString());
        setValue('');
        setOperator(input);
      } else if (value) {
        setBuffer(value);
        setValue('');
        setOperator(input);
      } else if (buffer) {
        setOperator(input);
      }
      setResultDisplayed(false);
    } else if (input === '=') {
      if (buffer && value) {
        const result = eval(`${buffer}${operator}${value}`);
        setValue(result.toString());
        setBuffer('');
        setOperator('');
        setResultDisplayed(true);
      }
    } else if (input === 'AC') {
      setValue('');
      setBuffer('');
      setOperator('');
      setResultDisplayed(false);
    } else if (input === 'DE') {
      setValue(value.slice(0, -1) || '0'); // Ensure "0" is displayed if all characters are deleted
    }
  };

  const buttons = [
    '', '', 'AC', 'DE', 
    '7', '8', '9', '*', 
    '4', '5', '6', '-', 
    '1', '2', '3', '+', 
    '.', '0', '/', '='
  ];

  return (
    <div className="calculator">
      <Display value={`${buffer} ${operator} ${value || '0'}`} />
      <div className="buttons">
        {buttons.map((btn, index) => (
          <Button 
            key={index} 
            value={btn} 
            onClick={() => handleClick(btn)} 
            className={btn === '' ? 'transparent-button' : ''} 
          />
        ))}
      </div>
    </div>
  );
}

export default Calculator;
