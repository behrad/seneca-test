const Seneca = require('seneca')

const myIp = require('./localAddress')[0]
const port = Number(process.env.port) || 40000

const seneca = Seneca(/*{transport: {host: myIp}}*/)

seneca

  .add('action:test', function(msg, done) {
    console.log(`Test Action ${JSON.stringify(msg)}`)
    done(null, {
      alert: 'You tested OK'
    })
  })

  // .use('consul-registry', {
  //   host: '10.10.151.27'
  // })

  .use('mesh', {
    isbase: true,
    // listen: [{
    //   pin: 'action:test',
    //   host: myIp
    // }],
    port: port,
    host: myIp,
    auto: true,
    discover: {
      multicast: {
        active: false
      }
    }
  })

  .ready( () => console.log('Base is Ready'))