const Seneca = require('seneca')

const myIp = require('./localAddress')[0]
const IP = process.env.IP || myIp

const seneca = Seneca(/*{transport: {host: myIp}}*/)

seneca

  .add('action:myService', function(msg, done) {
    console.log(`myService Action ${JSON.stringify(msg)}`)
    done(null, {alert: 'myService finished'})
  })

  // .use('consul-registry', {
  //   host: '10.10.151.27'
  // })

  .use('mesh', {
    bases: [IP+':40000'],
    listen: [{
      pin: 'action:myService',
      host: myIp
    }],
    host: myIp,
    auto: true,
    discover: {
      multicast: {
        active: false
      }
    }
  })

  .ready( () => console.log('myService is Ready'))