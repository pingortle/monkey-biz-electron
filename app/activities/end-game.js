module.exports = endGame

async function endGame(connection) {
  await connection.quit()
  await connection.disconnect()
  return await connection.close()
}
