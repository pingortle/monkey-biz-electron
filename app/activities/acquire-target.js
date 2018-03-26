module.exports = acquireTarget

async function acquireTarget(connection) {
  await connection.reset()
  return await connection.target()
}
