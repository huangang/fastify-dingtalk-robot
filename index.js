'use strict'

const fp = require('fastify-plugin')
const Robot = require('dingtalk-robot-sender')
const signHash = require('./sign')

function fastifyDingtalkRobot (fastify, options = {}, done) {
  const robot = new Robot({
    baseUrl: options.baseUrl || 'https://oapi.dingtalk.com/robot/send',
    accessToken: options.accessToken,
    httpclient: require('axios'),
    webhook: options.webhook
  })
  if (options.secret) { // 加签密钥
    const timestamp = Date.now()
    const sign = signHash(options.secret, timestamp + '\n' + options.secret)
    robot.webhook = robot.webhook + '&timestamp=' + timestamp + '&sign=' + sign
  }
  fastify.decorate('dingtalkRobot', robot)
  done()
}

module.exports = fp(fastifyDingtalkRobot, {
  name: 'fastify-dingtalk-robot'
})
