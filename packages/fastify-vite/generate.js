const { resolve } = require('path')
const fastifySSG = require('fastify-ssg')
const { parse: parseHTML } = require('node-html-parser')

async function ssgIntegration (app, options) {
  app.register(fastifySSG, {
    urls: options.urls,
    distDir: options.distDir,
    generate ({ url, distDir, source }) {
      const { payload: htmlWithPayload } = await app.inject({ url })
      const name = url.slice(1)
      if (name) {
        jsonURL = `${name}/index.json`
        htmlPath = resolve(distDir, `${name}/index.html`)
        jsonPath = resolve(distDir, jsonURL)
      } else {
        jsonURL = 'index.json'
        htmlPath = resolve(distDir, 'index.html')
        jsonPath = resolve(distDir, jsonURL)
      }
      const { html, json } = extractPayload(htmlWithPayload, `/${jsonURL}`)
      return {
        url,
        html: source(htmlPath, html),
        json: source(jsonPath, json),
      }
    }
  })
  app.commands.add('generate-server', {
    console.log(`ℹ generate server listening on ${address}`)
    const builder = Fastify()
    builder.listen(port, (err, address) => {
      if (err) {
        console.error(err)
        setImmediate(() => {
          process.exit(1)
        })
      }
      app.log.info(`ℹ generate server listening on ${address}`)
    }
  })
}

  generate (app, { exit }) {
    await app.ssg.generate()
    await exit()
  },


module.exports = {
  ssgIntegration,
}


function extractPayload (source, jsonPath) {
  const parsed = parseHTML(source)
  const scripts = parsed.querySelectorAll('script')
  for (const script of scripts) {
    if (script.innerHTML && script.innerHTML.includes('kPayload')) {
      // eslint-disable-next-line no-eval
      const hydrator = (0, eval)(`(function (window) {\n${script.innerHTML}\n})`)
      const hydration = {}
      hydrator(hydration)
      return {
        html: `${
          source.slice(0, script.range[0])
        }<script>window[Symbol.for('kStaticPayload')] = '${jsonPath}'</script>${
          source.slice(script.range[1])
        }`,
        json: hydration[Symbol.for('kPayload')],
      }
    }
  }
  return {
    html: source,
  }
}
