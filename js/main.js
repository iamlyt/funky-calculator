const calculator = {
    displayValue: '0',  //default display value of '0'
    firstOperand: null, 
    waitingForSecondOperand: false,
    operator: null,
};
// iteration of object calculator 
// outer variable = global variable 


//  
function inputDigit(digit) {
    const { displayValue,waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
    calculator.displayValue = digit; 
    calculator.waitingForSecondOperand = false; 
}   else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
}
console.log(calculator);
}

// places decimal 
function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.display = "0."
        calculator.waitingForSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = caculate(firstOperand, inputValue, operator);
    
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}
function caculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.secondOperand = null;
}

function updateDisplay() {
    const display = document.querySelector('.result'); 
    // declare variable of display
    // go to document
    // select element with class of .result 
    display.value = calculator.displayValue;
    // display the value inside result element(earlier declared)
    // with the object of calculator -- 
    // which displays 0 as default 
}
updateDisplay();    

const keys = document.querySelector('.btn-container');
keys.addEventListener('click', (event) => {
    // access the clicked element 
    // event delegation since buttons are 
    // children of btn-container
    const { target } = event;
    // destructuring assignment
    // same as (const target = event.target;)

    const { value } = target;
    //check if the clicked element is button
    //if no, exit function
    if (!target.matches('button')) {
        return;
    } 

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'clear':
            resetCalculator()
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
    updateDisplay();
});


