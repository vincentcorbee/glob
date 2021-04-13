Glob for nodejs

Simple sync glob utility for nodejs.

Supports globbing for ** and *

## Usage

Install with npm

```
npm i @digitalbranch/glob
```

```javascript
var glob = require("@digitalbranch/glob")

// options is optional
// Returns an array of matches: [
//  {
//    file: fs.Dirent,
//    path: string
//  }
//]
glob("**/*.js", options)
```

## glob(pattern, [options])

* `pattern` `{String}` Pattern to be matched
* `options` `{Object}`
* `return` `{
  file: fs.Dirent,
  path: String
}`

Performs a synchronous glob search.

### Options

* `cwd` The current working directory in which to search. Defaults
  to `process.cwd()`.
* `ignore` An array of globs to ignore.
