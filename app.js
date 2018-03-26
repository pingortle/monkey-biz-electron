const udp = require('dgram')

const choo = require('choo')
const html = require('choo/html')
const { MonkeyBusinessTester, OpenPipe } = require('monkey-biz-node')

const createConnection = require('./app/activities/create-connection')
const startGame = require('./app/activities/start-game')
const game = require('./app/game')

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

  emitter.on('updateAngle', value => state.angle = value)
  emitter.on('updateForce', value => state.force = value)
  emitter.on('result', value => state.result = value)

  emitter.on('startGame', async () => {
    const connection = createConnection()
    state.connection = await startGame(connection)
    emitter.emit('pushState', '/game')
  })
})

app.mount('#app')
app.route('/game', game)

function main(state, emit) {
  return html`
    <div>
      <button ${state.disabled} onclick=${runTest}>Run Test</button>
      <button ${state.disabled} onclick=${clickStart}>Start</button>
    </div>
  `

  async function runTest() {
    const tester = new MonkeyBusinessTester(new OpenPipe(udp.createSocket('udp4')))
    emit('running')
    await tester.run().catch(error => console.error(error))
    emit('done')
  }

  function clickStart() {
    emit('startGame')
  }
}
