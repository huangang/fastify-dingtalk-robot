# fastify-dingtalk-robot

Fastify plugin for dingtalk robot.

[![NPM version](https://img.shields.io/npm/v/fastify-dingtalk-robot.svg?style=flat)](https://www.npmjs.com/package/fastify-dingtalk-robot)

## Install
```
npm i fastify-dingtalk-robot --save
```

## Usage

```js
'use strict'

const fastify = require('fastify')()
fastify.register(require('fastify-dingtalk-robot'), {
  accessToken: 'xxxxxxxxx',
  secret: 'SECxxxxxx'
})
const { dingtalkRobot } = fastify
const textContent = {
  msgtype: 'text',
  text: {
    content: '我就是我, 是不一样的烟火'
  },
  at: {
    atMobiles: [
      '156xxxx8827',
      '189xxxx8325'
    ],
    isAtAll: false
  }
}
dingtalkRobot.send(textContent)
  .then((res) => {
  // TODO
  })
```

### [More Usage](https://github.com/x-cold/dingtalk-robot#1-%E7%94%A8%E6%B3%95)
