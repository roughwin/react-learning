const text = document.createElement('div')
text.style.position = 'fixed'
text.style.bottom = '0px'
document.body.appendChild(text)
const dddd = document.createElement('div')
dddd.innerText = '.'
dddd.style.backgroundColor = 'red'
dddd.style.position = 'fixed'
dddd.style.opacity = '0.5'
dddd.id = 'hllaa'
document.body.appendChild(dddd)
let old = '';
window.addEventListener('mouseover', (e) => {
  // if (e.target.id === dddd.id) {
  //   dddd.style.height = 0
  //   dddd.style.width = 1
  //   return
  // }
  const r = e.target.getBoundingClientRect();
  console.log(r, e.target)
  text.innerText = JSON.stringify(r)
  dddd.style.top = `${r.top}px`
  dddd.style.left = `${r.left}px`
  // dddd.style.width = `${r.right - r.left}px`
  // dddd.style.height = `${r.bottom - r.top}px`
  // old = e.target.style.backgroundColor
  // e.target.style.backgroundColor = '#55aaff'
}, true);
// window.addEventListener('mouseout', (e) => {
//   console.log(e.target)
//   e.target.style.backgroundColor = old
// }, true)
// window.addEventListener('click', (e) => {
//   console.log(e.target.path)
//   e.stopImmediatePropagation();
// }, true)