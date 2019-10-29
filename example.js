'use strict'
const fastify = require('fastify')()

fastify.register(require('.'), {
  accessToken: '7ba345exxxxxxxxxxxxxxdf879',
  secret: 'SECxxxxxxxxxxxxa5131'
})

fastify.get('/robot', (request, reply) => {
  const { dingtalkRobot } = fastify
  const textContent = {
    msgtype: 'text',
    text: {
      content: '我就是我, 是不一样的烟火'
    }
  }
  dingtalkRobot.send(textContent)
    .then((res) => {
      // console.log('res', res)
      console.log('data', res.data)
    })
  reply.send('hello world')
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
