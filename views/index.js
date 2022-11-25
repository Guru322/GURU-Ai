window.onload = () => {
let chat = document.querySelector('div.container-fluid')
function addMsg(obj) {
  let html = document.createElement('span')
  html.className = 'msg'
  html.innerHTML = obj
  chat.appendChild(html)
}

window.onclick = () => addMsg(12)
}
