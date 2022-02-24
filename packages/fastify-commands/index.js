const fp = require('fastify-plugin')
const kebabCase = require('lodash.kebabcase')

function fastifyCommands (fastify, options, done) {
  fastify.decorate('commands', async () => {
    for (let cmd of Object.keys(options.commands)) {
      if (process.argv.includes(kebabCase(cmd))) {
        await options.commands[cmd]({ exit })
        break
      }
    }
  })
  async function exit () {
    await fastify.close()
    setImmediate(() => {
      process.exit(0)
    })
  }
}

module.exports = fp(fastifyCommands)
