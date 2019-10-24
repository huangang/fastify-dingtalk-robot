'use strict'

const fp = require('fastify-plugin')
const Robot = require('dingtalk-robot-sender')

function fastifyDingtalkRobot (fastify, options = {}, done) {
  const robot = new Robot({
    baseUrl: options.baseUrl || 'https://oapi.dingtalk.com/robot/send',
    accessToken: options.accessToken,
    httpclient: require('axios'),
    webhook: options.webhook
  })
  fastify.decorate('dingtalkRobot', robot)
  done()
}

module.exports = fp(fastifyDingtalkRobot, {
  name: 'fastify-dingtalk-robot'
})
