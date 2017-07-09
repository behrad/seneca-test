const Seneca = require('seneca')
const bench = require('fastbench')

const myIp = require('./localAddress')[0]
const IP = process.env.IP || myIp

const action = process.argv[2] || 'myService'

const seneca = Seneca(/*{transport: {host: IP}}*/)

seneca

  // .use('consul-registry', {
  //   host: '10.10.151.27'
  // })

  .use('mesh', {
    bases: [IP+':40000'],
    host: myIp,
    discover: {
      multicast: {
        active: false
      }
    }
  })

  .ready( function () {
    console.log('Client is Ready')

    function call (cb) {
      seneca.act(
        {
          action: action,
          name: 'behrad_test',
          default$: {name: 'behrad'}
        },
        function (err, msg) {
          if(err) {
            console.error(`Error calling action ${err}`)
          } else {
            // console.log(`Action back to client with ${msg.alert}`)
          }
          cb()
          // this.close()
        })
    }

    bench([call], 1)()
  })
