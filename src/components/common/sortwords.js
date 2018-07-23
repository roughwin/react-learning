const word = require('./word1.json')
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
})

function genPinyin(s) {
  const r = [];
  s.split('').forEach(c => {
    const x = map[c];
    if (x) {
      r.push(x)
    } else {
      r.push([c])
    }
  });
  return r;
}

const testWords = [
  '小孙子',
  '测试',
  'example'
].map((c, originIndex) => ({
  pinyin: genPinyin(c),
  originIndex,
  line: c,
}))

function trans(arrs) {
  return arrs.map((c, originIndex) => ({
    pinyin: genPinyin(c),
    originIndex,
    line: c,
  }));
}

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
        if (strarr[c] === char) {
          return [a, b, c];
        }
      }
    }
  }
}

function filter(arr, str) {
  if (!str) return arr.map(a => ([1, a.line]))
  return arr.map(l => {
    const { pinyin, line, originIndex } = l;
    const r = rank(pinyin, str);
    console.log(r, line, str, pinyin)
    return ([r, line]);
  }).filter(a => a[0]);
}

module.exports = {
  trans,
  filter,
  rank
};
