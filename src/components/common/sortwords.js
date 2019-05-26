const wordMap = require('./word1.json');

const map = {};


Object.keys(wordMap).forEach(k => {
  const s = wordMap[k].split('');
  s.forEach(c => {
    if (map[c]) {
      map[c].push(k);
    } else {
      map[c] = [k];
    }
  });
});



function genPinyin(s) {
  const r = [];
  const sarr = s.split('');
  sarr.forEach(c => {
    const x = map[c];
    if (x) {
      r.push(x);
    }
    r.push([c]);
  });
  return r;
}


/**
 * 汉字转为 拼音
 * line：原始数据
 * pinyin：原始数据对应的拼音数组
 * @param {array} arrs
 */
function trans(arrs) {
  return arrs.map((c, originIndex) => ({
    pinyin: genPinyin(c),
    originIndex,
    line: c,
  }));
}

function isPosValid(newPos, startPos) {
  const [a1, b1, c1] = newPos;
  const [a0, b0, c0] = startPos;
  const asame = a1 === a0; const bsame = b1 === b0; const
    csame = c1 === c0;
  if (asame && (!bsame) && c0 >= 0) {
    return false;
  }
  if (asame && bsame && csame) {
    return false;
  }
  return newPos;
}

function getPos(line, char, lastPos) {
  const [a0, b0, c0] = lastPos;
  let a = a0; let b = b0; let c = c0;
  const result = [];
  for (; a < line.length; a += 1, b = 0, c = 0) {
    const word = line[a];
    for (; b < word.length; b += 1, c = 0) {
      const str = word[b];
      for (; c < str.length; c += 1) {
        const strarr = str.split('');
        const t = strarr[c] || '';
        if (t.toUpperCase() === char.toUpperCase()) {
          if (isPosValid([a, b, c], lastPos)) {
            result.push([a, b, c]);
          } else {
            break;
          }
        }
      }
    }
  }
  return result;
}


/**
 *
 * @param {*} line 一行数据
 * @param {*} test
 */
function rank(line, test) {
  const testArr = test.split('');
  let startPos = [0, 0, -1];
  const x = getSubTestRank(line, testArr, startPos, 0)
  console.log(test, x)
  return x;
}

function max(arr = []) {
  return arr.reduce((m, current) => {
    if (current > m) {
      return current;
    }
    return m;
  }, 0)
}

function getSubTestRank(line, subTest, startPos, parentRank) {
  if (!subTest.length) return parentRank;
  const positions = getPos(line, subTest[0], startPos);
  if (positions && positions.length) {
    const newSubranks = positions.map((newPos, index) => getSubTestRank(line, subTest.slice(1), newPos, parentRank + 1));
    return max(newSubranks);
  } else {
    return 0;
  }
}

function test() {
  const line = genPinyin('合作项目')
  console.log(line)
  const t = 'hz'
  const r = rank(line, t)
  console.log(r)
}
test()

// 筛选
function filter(arr, testStr) {
  const str = testStr.trim();
  if (!str) return arr.map(a => ([1, a.line]));
  return arr.map(l => {
    const { pinyin, line, originIndex } = l;
    const r = rank(pinyin, str);
    return ([r, line, originIndex]);
  }).filter(a => a[0]);
}

module.exports = {
  trans,
  filter,
  rank,
};
