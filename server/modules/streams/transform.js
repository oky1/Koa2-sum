/* eslint-disable */
import fs from 'fs'
import stream from 'stream'

class ToUpperCaseStream extends stream.Transform {
  constructor(options = {}) {
    options = Object.assign({}, options, { decodeStrings: false })
    super(options)
  }

  _transform(chunk, encoding, cb) {
    if (encoding !== 'utf8') {
      this.emit('error', new Error('Only UTF-8 source'))
      return cb()
    }
    this.push(chunk.toUpperCase())
    cb()
  }
}

export default () => async ctx => {
    ctx.req.setEncoding('utf8')
    ctx.response.body = await ctx.req.pipe(new ToUpperCaseStream())
}
 
// export default () => async (ctx, next) => {
//   await fs.createReadStream('./server/modules/streams/file1.txt', 'utf8')
//           .pipe(new ToUpperCaseStream())
//           .pipe(fs.createWriteStream('./server/modules/streams/file2.txt'))
//   return next()
// }
