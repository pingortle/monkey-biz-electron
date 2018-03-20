const udp = require('dgram')

const choo = require('choo')
const html = require('choo/html')
const { MonkeyBusinessTester, OpenPipe } = require('monkey-biz-node')

const app = choo()

app.route('/', main)

app.mount('#app')

function main() {
  return html`
    <div>
      <button onclick=${runTest}>Run Test</button>
    </div>
  `

  function runTest() {
    const tester = new MonkeyBusinessTester(new OpenPipe(udp.createSocket('udp4')))
    tester.run().catch(error => console.error(error))
  }
}
