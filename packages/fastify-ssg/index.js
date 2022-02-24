function getPaths (options) {
  const { generated } = options
  const paths = []
  if (typeof options.paths === 'function') {
    await options.paths(fastify, (path) => paths.push(path))
  } else if (Array.isArray(options.paths)) {
    paths.push(...options.paths)
  } else {
    paths.push(
      ...routes
        .filter(({ path }) => matchit.parse(path).every(segment => segment.type === 0))
        .map(({ path }) => path),
    )
  }
}