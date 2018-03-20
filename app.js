const choo = require('choo')
const html = require('choo/html')

const app = choo()

app.route('/', main)

app.mount('#app')

function main() {
  return html`<div>hello choo</div>`
}
