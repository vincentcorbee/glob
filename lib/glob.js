const createRegExp = pattern =>
  new RegExp(
    `^${pattern.replace(/(\*{2}\/)|(\*{1})|\./g, match => {
      switch (match) {
        case '**/':
          return `(?:.*\/)*`
        case '*':
          return `[^\/]*`
        case '.':
          return `\\.`
      }
    })}$`
  )
const glob = (pattern, config = {}) => {
  const { cwd = process.cwd() } = config
  const results = []
  const ignore = (config.ignore || []).map(pattern => createRegExp(pattern))

  pattern = createRegExp(pattern)

  const traverse = loc => {
    const dir = readDir(loc)

    for (const entry of dir) {
      const { name } = entry
      const target = path.join(loc.replace(cwd, ''), name)

      if (ignore.find(reg => reg.test(target))) break

      if (entry.isDirectory()) {
        traverse(target)
      } else if (pattern.test(target)) {
        results.push({
          file: entry,
          path: target,
        })
      }
    }
  }

  traverse(cwd)

  return results
}

module.exports = glob
