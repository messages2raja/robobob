//Calculate the basic arithmetic expressions
const calculateResult = (inputValue) => {
const numbers = inputValue.split(/[+\-*/]/g).map((num) => parseFloat(num));
const operators = inputValue.replace(/\d+(\.\d+)?/g, "").split("");
let result = numbers[0];

for (let i = 0; i < operators.length; i++) {
  switch (operators[i]) {
    case "+":
      result += numbers[i + 1];
      break;
    case "-":
      result -= numbers[i + 1];
      break;
    case "*":
      result *= numbers[i + 1];
      break;
    case "/":
      result /= numbers[i + 1];
      break;
    default:
      result = NaN;
      break;
  }
}

return result;
};

export default calculateResult;