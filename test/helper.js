export function createElement (index) {
  const div = document.createElement('div')
  div.innerHTML = index || ''
  return div
}

export function beforeEach () {
  let div = document.getElementById('div')
  if (!div) {
    div = createElement()
    div.id = 'div'
    document.body.appendChild(div)
  }
  div.innerHTML = ''

  const classDIV = createElement()
  classDIV.className = 'simple-dom-query'
  insert(div, classDIV)

  const attrDIV = createElement()
  attrDIV.setAttribute('simple-dom-query', '1')
  insert(div, attrDIV)

  const span = document.createElement('span')
  span.innerHTML = 'span'
  span.className = 'simple-dom-query'
  insert(attrDIV, span)
  insert(div, span)
}

export function insert (parent, child) {
  parent.appendChild(child)
}

export function afterEach () {
  let div = document.getElementById('div')
  while(div.children[0]) {
    div.removeChild(div.firstChild)
  }
}