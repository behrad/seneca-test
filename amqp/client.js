const bench = require('fastbench')

const client = require('seneca')()

  .use('seneca-amqp-transport', {
    amqp: {
      client: {
        channel: {
          prefetch: 1000
        }
      }
    }
  })

  .client({
    type: 'amqp',
    pin: 'cmd:log, level:error',
    url: 'amqp://admin:mqadminP@ssw0rd@10.10.151.27:5672',
    // publish: {
    //   persistent: true
    // }
  })

  .ready( _ => {
    console.log('Client Ready!')
    let i = 1
    function call (cb) {
      client.act('cmd:log, level:error', {
        message: 'Hello World ' + i++
      }, (err, res) => {
        err && console.error(err)
        console.log('Called ', err || res)
        cb(err, res)
      })
    }

    bench([call], 1)()

  })