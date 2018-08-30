const word = require('./word1.json');

const map = {};
Object.keys(word).forEach(k => {
  const s = word[k].split('');
  s.forEach(c => {
    if (map[c]) {
      map[c].push(k)
    } else {
      map[c] = [k];
    }
  });
});

function genPinyin(s) {
  const r = [];
  const sarr = s.split('')
  sarr.forEach(c => {
    const x = map[c];
    if (x) {
      r.push(x)
    } else {
      r.push([c])
    }
  });
  return r.concat(sarr);
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


/**
 * 
 * @param {*} line 一行数据
 * @param {*} test 
 */
function rank(line, test) {
  const testArr = test.split('');
  let rankNum = 0;
  let startPos = [0, 0, 0];
  for (const c of testArr) {
    const pos = getPos(line, c, startPos);
    if (pos) {
      startPos = pos;
      rankNum++
    } else {
      return 0;
    }
  }
  return rankNum;
}

function getPos(line, char, startPos) {
  let [a, b, c] = startPos;
  for (; a < line.length; a++ , b = 0, c = 0) {
    const word = line[a];
    for (; b < word.length; b++ , c = 0) {
      const str = word[b];
      for (; c < str.length; c++) {
        const strarr = str.split('');
        if (strarr[c].toUpperCase() === char.toUpperCase()) {
          return [a, b, c];
        }
      }
    }
  }
}


// 筛选
function filter(arr, testStr) {
  const str = testStr.trim();
  if (!str) return arr.map(a => ([1, a.line]))
  return arr.map(l => {
    const { pinyin, line, originIndex } = l;
    const r = rank(pinyin, str);
    return ([r, line, originIndex]);
  }).filter(a => a[0]);
}

module.exports = {
  trans,
  filter,
  rank
};
