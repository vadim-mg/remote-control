import { mouseCommand } from "../commands/mouseCommands.js"
import { drawCommand } from "../commands/drawCommands.js"
import { printCommand } from "../commands/printCommands.js"
import { Transform, TransformCallback } from "stream"



class Controller extends Transform {
  cb
  constructor(cb: Function) {
    super();
    this.cb = cb
  }
  async _transform(message: any, encoding: BufferEncoding, callback: TransformCallback) {
    try {
      const [command, type, ...args] = message.toString().split(/\ |\_/)
      let result = [command, type].join('_') + ' '
      switch (command) {
        case 'mouse':
          result += await mouseCommand(type, args)
          break
        case 'draw':
          result += await drawCommand(type, args)
          break
        case 'prnt':
          result += await printCommand(type, args)
      }

      this.cb(result)
      callback(null, result);
    } catch (err: any) {
      this.cb(`Error:${err.message}`)
      callback(err);
    }
  }
}


export { Controller }