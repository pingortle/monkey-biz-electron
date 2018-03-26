module.exports = throwBanana

async function throwBanana(connection, { angle, force }) {
  await connection.shoot({ angle, force })
  return await connection.result()
}
