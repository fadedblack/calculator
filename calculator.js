function calculator(input) {
  return 1;
}

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
        longestString = string;
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

function test(input, expected, tableData) {
  const acutal = calculator(input);
  const mark = getMark(acutal, expected);

  const testData = [mark, input, expected, acutal];

  tableData.push(testData);
}

function getHeading() {
  const heading = [
    "Status", "Input",
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
  test('input', 1, tableData);

  printTable(tableData);
}

testAll();