const udp = require('dgram')
const { OpenPipe } = require('monkey-biz-node')

module.exports = createConnection

function createConnection() {
  return new OpenPipe(udp.createSocket('udp4'))
}
