let main_grid = document.getElementById("main_grid");
let sub_grid = document.getElementById("sub_grid");
let topDisplay = document.getElementById("upper");
let btmDisplay = document.getElementById("lower");

btmDisplay.textContent = 0;

let data = {
  sub: [ 'MC', 'MR', 'M+', 'M-', 'MS', 'M' ],
  main: [
    '%', 'CE', 'C', '⌫',
    '1/ₓ', 'x²', '√x', '÷',
    '7', '8', '9', 'X',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '±', '0', '.', '='
 ],
 memory: 0
}

for (var i = 0; i < 6; i++) {
  let e = document.createElement("button");

  let content = data.sub[i];
  e.textContent = content;

  switch (content) {
    case 'MC':
      e.onclick = () => memoryClear();
      break;
    case 'MR':
      e.onclick = () => memoryRecall();
      break;
    case 'M+':
      e.onclick = () => memoryAdd();
      break;
    case 'M-':
      e.onclick = () => memorySubtract();
      break;
    case 'MS':
      e.onclick = () => memoryStore();
      break;
    case 'M':
      e.onclick = () => memoryDisplay();
      break;
  }

  sub_grid.appendChild(e);
}

for (var i = 0; i < 24; i++) {
  let e = document.createElement("button");

  let content = data.main[i];
  e.textContent = content;

  switch (content) {
    case 'CE':
      e.onclick = () => clearEntry();
      break;
    case 'C':
      e.onclick = () => clearDisplay();
      break;
    case '⌫':
      e.onclick = () => cancelEntry();
      break;
    case '1/ₓ':
      e.onclick = () => reciprocal();
      break;
    case 'x²':
      e.onclick = () => square();
      break;
    case '√x':
      e.onclick = () => squareRoot();
      break;
    case '±':
      e.onclick = () => changeSign();
      break;
    case '=':
      e.onclick = () => calculateResult();
      break;
    case 'X':
      e.onclick = () => appendNumber('*');
      break;
    default:
      e.onclick = () => appendNumber(content);
      break;
  }

  main_grid.appendChild(e);
}

function appendNumber(number) {
  topDisplay.textContent += number;
}

function calculateResult() {
  try {
    const result = eval(topDisplay.textContent);
    btmDisplay.textContent = result;
  } catch (error) {
    btmDisplay.textContent = 'Error';
  }
}

function clearDisplay() {
  topDisplay.textContent = '';
  btmDisplay.textContent = '';
}

function clearEntry() {
  btmDisplay.textContent = '';
}

function cancelEntry() {
  topDisplay.textContent = topDisplay.textContent.slice(0, -1);
}

function memoryAdd() {
  data.memory += parseFloat(btmDisplay.textContent);
  clearEntry();
}

function memorySubtract() {
  data.memory -= parseFloat(btmDisplay.textContent);
  clearEntry();
}

function memoryRecall() {
  topDisplay.textContent = data.memory.toString();
}

function memoryClear() {
  data.memory = 0;
}

function memoryStore() {
  data.memory = parseFloat(btmDisplay.textContent);
  clearEntry();
}

function memoryDisplay() {
  topDisplay.textContent = data.memory.toString();
}

function square() {
  const currentValue = parseFloat(btmDisplay.textContent);
  const result = currentValue * currentValue;
  btmDisplay.textContent = result;
}

function reciprocal() {
  const currentValue = parseFloat(btmDisplay.textContent);
  if ( currentValue !== 0 ) {
    const result = 1 / currentValue;
    btmDisplay.textContent = result;
  } else {
    btmDisplay.textContent = 0;
  }
}

function squareRoot() {
  const currentValue = parseFloat(btmDisplay.textContent);
  if ( currentValue >= 0 ) {
    const result = Math.sqrt(currentValue);
    btmDisplay.textContent = result;
  } else {
    btmDisplay.textContent = 'Math Error';
  }
}

function changeSign() {
  const currentValue = parseFloat(btmDisplay.textContent);
  const result = -currentValue;
  btmDisplay.textContent = result;
}
