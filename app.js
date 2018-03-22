const udp = require('dgram')

const choo = require('choo')
const html = require('choo/html')
const { MonkeyBusinessTester, OpenPipe } = require('monkey-biz-node')

const app = choo()

app.route('/', main)

app.use((state, emitter) => {
  state.disabled = ''

  emitter.on('running', () => {
    console.log('running')
    state.disabled = 'disabled'
    emitter.emit('render')
  })

  emitter.on('done', () => {
    console.log('done')
    state.disabled = ''
    emitter.emit('render')
  })
})

app.mount('#app')

function main(state, emit) {
  return html`
    <div>
      <button ${state.disabled} onclick=${runTest}>Run Test</button>
    </div>
  `

  async function runTest() {
    const tester = new MonkeyBusinessTester(new OpenPipe(udp.createSocket('udp4')))
    emit('running')
    await tester.run().catch(error => console.error(error))
    emit('done')
  }
}
