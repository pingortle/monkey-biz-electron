module.exports = startGame

async function startGame(connection, speed = 'slow') {
  await connection.connect()
  await connection.train()
  await connection[speed]()
  return connection
}
