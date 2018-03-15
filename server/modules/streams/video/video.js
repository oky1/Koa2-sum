// app.use(koaVideo({ extMatch: /\.mp[3-4]$/i }))
import fs from 'fs'
import path from 'path'

const mime = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  ogg: 'application/ogg',
  ogv: 'video/ogg',
  mpg: 'video/mpeg',
  flv: 'flv-application/octet-stream',
  mp3: 'audio/mpeg',
  wav: 'audio/x-wav'
}

let getContentType = (type)=> {
  if (mime[type]) {
    return mime[type]
  }
  return null
}

/* eslint-disable */
let readFile = async (ctx, options) => {
  let match = ctx.request.header.range
  let ext = path.extname(ctx.path).toLocaleLowerCase()
  let diskPath = decodeURI(path.resolve(options.root + ctx.path))
  let bytes = match.split('=')[1]
  let stats = fs.statSync(diskPath)
  let start = Number.parseInt(bytes.split('-')[0])
  let end = Number.parseInt((bytes.split('-')[1]) || (stats.size - 1))
  if (stats.isFile()) {
    return new Promise((rev, rej)=> {
      let stream = fs.createReadStream(diskPath, { start: start, end: end })
      ctx.set('Content-Range', `bytes ${start}-${end}/${stats.size}`)
      ctx.set('Accept-Ranges', `bytes`)
      ctx.status = 206
      ctx.type = getContentType(ext.replace('.', ''))
      stream.on('open', function () {
        stream.pipe(ctx.res)
      })
      stream.on('error', function (err) {
        ctx.body = err
        rej()
      })
      stream.on('end', function () {
        rev()
      })
    })
  }
}

module.exports = function (opts) {
  let options = Object.assign({}, {
    extMatch: ['.mp4', '.flv', '.webm', '.ogv', '.mp3', '.mpg', '.wav', '.ogg'],
    root: __dirname // process.cwd()
  }, opts)

  return async (ctx, next) => {
    let ext = path.extname(ctx.path).toLocaleLowerCase()
    if ((options.extMatch instanceof Array && options.extMatch.indexOf(ext) > -1) ||
            (options.extMatch instanceof RegExp && options.extMatch.test(ctx.path))) {
      if (ctx.request.header && ctx.request.header.range) {
        return await readFile(ctx, options)
      }
    }
    await next()
  }
}
