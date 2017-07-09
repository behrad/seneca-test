require('seneca')()

  .use('seneca-amqp-transport', {
    amqp: {
      listener: {
        queues: {
          options: {
            durable: true,
            exclusive: false
          }
        },
        channel: {
          prefetch: 1000
        },
      }
    }
  })

  .add('cmd:log, level:*', function(req, done) {
    console[req.level](req.message);
    return done(null, { ok: true, when: Date.now() });
  })

  .listen({
    type: 'amqp',
    pin: 'cmd:log, level:*',
    url: 'amqp://admin:mqadminP@ssw0rd@10.10.151.27:5672',
    consume: {
    }
  })

  .ready( () => console.log('AMQP service is Ready'))