const sum = require('./fun');

test('adds 1 + 2', () => {
  expect(sum(1, 2)).toBe(3);
})



const myMock0 = jest.fn();
myMock0('1');
myMock0('a', 'b');
console.log(myMock0.mock.calls);


// const myMock = jest.fn();

const a = new myMock0();
const b = {};
const bound = myMock0.bind(b);
bound();

console.log(myMock0.mock.instances);