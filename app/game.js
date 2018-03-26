const html = require('choo/html')
const throwBanana = require('./activities/throw-banana')
const acquireTarget = require('./activities/acquire-target')
const endGame = require('./activities/end-game')

module.exports = game

function game(state, emit) {
  return html`
    <div>
      <input type="text" oninput=${updateAngle} />
      <input type="text" oninput=${updateForce} />
      <button ${state.disabled} onclick=${clickThrow}>Throw</button>
      <button ${state.disabled} onclick=${clickEnd}>End</button>
      <strong>${state.result}</strong>
    </div>
  `

  function updateAngle(event) {
    emit('updateAngle', event.target.value)
  }

  function updateForce(event) {
    emit('updateForce', event.target.value)
  }

  async function clickThrow() {
    emit('running')
    emit('result', await throwBanana(
        state.connection,
        { angle: state.angle, force: state.force }
      )
    )
    await acquireTarget(state.connection)
    emit('done')
  }

  async function clickEnd() {
    emit('running')
    await endGame(state.connection)
    emit('done')
    emit('pushState', '/')
  }
}
