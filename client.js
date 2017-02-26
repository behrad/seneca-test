const Seneca = require('seneca')

const myIp = require('./localAddress')[0]
const IP = process.env.IP || myIp

const seneca = Seneca(/*{transport: {host: IP}}*/)

seneca

  .use('mesh', {
    bases: [IP+':40000'],
    host: myIp,
    discover: {
      multicast: {
        active: false
      }
    }
  })

  .use('consul-registry', {
    host: '10.10.151.27'
  })

  .ready( function () {
    console.log('Client is Ready')

    seneca.act(
      {
        action: 'myService',
        name: 'behrad_test',
        default$: {name: 'behrad'}
      },
      function (err, msg) {
        if(err) {
          console.error(`Error calling action ${err}`)
        } else {
          console.log(`Action back to client with ${msg.alert}`)
        }
        this.close()
      })
  })
