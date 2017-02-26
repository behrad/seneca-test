const Seneca = require('seneca')

const myIp = require('./localAddress')[0]
const IP = process.env.IP || myIp

const seneca = Seneca(/*{transport: {host: myIp}}*/)

seneca

  .add('action:myService', function(msg, done) {
    console.log(`myService Action ${JSON.stringify(msg)}`)
    done(null, {
      alert: 'myService finished'
    })
  })

  .use('mesh', {
    listen: [{
      pin: 'action:myService',
      host: myIp
    }],
    bases: [IP+':40000'],
    host: myIp,
    // auto: true,
    // discover: {
    //   multicast: {
    //     active: false
    //   }
    // }
  })

  // .use('consul-registry', {
  //   host: '10.10.151.27'
  // })

  .ready( () => console.log('myService is Ready'))