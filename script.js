class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.resetScreen = false;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
            return;
        }
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
            case 'add':
                computation = prev + current;
                break;
            case '-':
            case 'subtract':
                computation = prev - current;
                break;
            case '×':
            case 'multiply':
                computation = prev * current;
                break;
            case '÷':
            case 'divide':
                if (current === 0) {
                    computation = "Error";
                    this.currentOperand = computation;
                    this.operation = undefined;
                    this.previousOperand = '';
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Fix floating point errors (e.g. 0.1 + 0.2)
        computation = Math.round(computation * 1000000000) / 1000000000;
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        if (number === "Error") return number;
        
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '0';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            const opSymbol = this.getOperationSymbol(this.operation);
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${opSymbol}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
    
    getOperationSymbol(op) {
        switch(op) {
            case 'add': return '+';
            case 'subtract': return '−';
            case 'multiply': return '×';
            case 'divide': return '÷';
            default: return op;
        }
    }
}

// DOM Elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-action]');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Event Listeners for Clicks
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.getAttribute('data-number'));
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        
        if (action === 'clear') {
            calculator.clear();
            calculator.updateDisplay();
        } else if (action === 'delete') {
            calculator.delete();
            calculator.updateDisplay();
        } else if (action === 'calculate') {
            calculator.compute();
            calculator.updateDisplay();
        } else if (action === 'percent') {
             // Simple percentage logic: divide current by 100
             if(calculator.currentOperand === '') return;
             calculator.currentOperand = parseFloat(calculator.currentOperand) / 100;
             calculator.updateDisplay();
        } else {
            // Operators
            calculator.chooseOperation(action);
            calculator.updateDisplay();
        }
    });
});

// Keyboard Support
document.addEventListener('keydown', event => {
    let key = event.key;
    
    // Numbers
    if (/[0-9.]/.test(key)) {
        calculator.appendNumber(key);
        calculator.updateDisplay();
    }
    
    // Operators mapping
    if (key === '+' || key === 'Add') {
        calculator.chooseOperation('add');
        calculator.updateDisplay();
    }
    if (key === '-' || key === 'Subtract') {
        calculator.chooseOperation('subtract');
        calculator.updateDisplay();
    }
    if (key === '*' || key === 'Multiply' || key === 'x') {
        calculator.chooseOperation('multiply');
        calculator.updateDisplay();
    }
    if (key === '/' || key === 'Divide') {
        event.preventDefault(); // Prevent quick search in Firefox
        calculator.chooseOperation('divide');
        calculator.updateDisplay();
    }
    
    // Actions
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    if (key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
    if (key === 'Escape' || key === 'Delete') {
        calculator.clear();
        calculator.updateDisplay();
    }
});
