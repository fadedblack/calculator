function sum(x, y) {
  return x + y;
}

const add = function (number1, number2) {
  return number1 + number2;
};

const sub = function (number1, number2) {
  return number1 - number2;
};

const multiply = function (number1, number2) {
  return number1 * number2;
};

const calculate = function (operation, number1, number2) {
  return operation(number1, number2);
};

const userInput = function () {
  const symbols = [sum, add, sub, multiply];

  const operation = +prompt("Enter operation: ", 0);
  const number1 = +prompt("Enter number: ", 0);
  const number2 = +prompt("Enter number: ", 0);

  console.logcalculate(symbols[operation % 4], number1, number2);
};

userInput();

const noReturn = function (x, y) {
  console.log('hello');
  console.log(x + y);
};

// console.log(calculate(add, 1, 2));
// console.log(calculate(add, 5, 4));

// console.log(calculate(sub, 5, 4));
// console.log(calculate(sub, 1, 3));

// console.log(calculate(multiply, 1, 3));
// console.log(calculate(multiply, 4, 7));

//************************************TABLE*************************************
const DASH = '━';
const BAR = '┃';
const SPACE = ' ';

function isEven(number) {
  return (number & 1) === 0;
}

function insertData(message, size) {
  const totalSpaces = size - message.toString().length;
  const padding = isEven(size) ? 0 : 1;

  const timesLeft = Math.floor(totalSpaces / 2);
  const timesRight = Math.ceil(totalSpaces / 2) + padding;

  return BAR + SPACE.repeat(timesLeft) + message + SPACE.repeat(timesRight);
}

function insertAllData(values, size) {
  let table = [];

  for (const row of values) {
    for (const column of row) {
      table.push(insertData(column, size));
    }

    table.push('┃\n' + getBorder('┣', '╋', '┫', row.length, size) + '\n');
  }

  table.pop();
  return table.join("");
}

function getBorder(start, middle, end, columns, length) {
  const times = Math.ceil(length / 2);
  const column = DASH.repeat(times) + middle + DASH.repeat(times);

  const startingSegment = start + DASH.repeat(times);
  const endingSegment = DASH.repeat(times) + end;

  return startingSegment + column.repeat(columns - 1) + endingSegment;
}

function getLargestSize(values) {
  let longestString = '';

  for (const rows of values) {
    for (const string of rows) {
      if (string.toString().length > longestString.length) {
        longestString = string.toString();
      }
    }
  }

  return longestString.length;
}

function createTable(values) {
  const size = getLargestSize(values);

  const table = getBorder('┏', '┳', '┓', values[0].length, size) + '\n';
  const bottom = '┃\n' + getBorder('┗', '┻', '┛', values[0].length, size);

  return table + insertAllData(values, size) + bottom;
}

//***********************************TESTING***********************************

function display(table) {
  console.log(table);
}

function getMark(acutal, expected) {
  return acutal === expected ? '🟢' : '🔴';
}

function test(operation, number1, number2, expected, tableData) {
  const acutal = calculate(operation, number1, number2);
  const mark = getMark(acutal, expected);

  const testData = [mark, operation, number1, number2, expected, acutal];

  tableData.push(testData);
}

function getHeading() {
  const heading = [
    "Status", "Operation", "Number1", "Number2",
    "Expected Output", "Actual Output"
  ];

  return heading;
}

function printTable(tableData) {
  display(createTable(tableData));
}

function testAll() {
  display("\nTesting Calculator Function:\n");

  const tableData = [getHeading()];

  test(add, 1, 2, 3, tableData);
  // test(add, 5, 4, 9, tableData);

  printTable(tableData);
}

// testAll();