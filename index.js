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
    const originWebhook = robot.webhook
    robot.send = function (content) {
      const timestamp = Date.now()
      const sign = signHash(options.secret, timestamp + '\n' + options.secret)
      const webhook = originWebhook + '&timestamp=' + timestamp + '&sign=' + sign
      const { httpclient } = this
      return httpclient.request(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(content)
      })
    }
  }
  fastify.decorate('dingtalkRobot', robot)
  done()
}

module.exports = fp(fastifyDingtalkRobot, {
  name: 'fastify-dingtalk-robot'
})
