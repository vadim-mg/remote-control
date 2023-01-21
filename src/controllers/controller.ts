import { mouseCommand } from "../commands/mouseCommands.js"
import { drawCommand } from "../commands/drawCommands.js"
import { printCommand } from "../commands/printCommands.js"

export const controller = async (message: string): Promise<string | undefined> => {

  const [command, type, ...args] = message.split(/\ |\_/)

  let result = ''
  switch (command) {
    case 'mouse':
      result = await mouseCommand(type, args)
      break
    case 'draw':
      result = await drawCommand(type, args)
      break
    case 'prnt':
      result = await printCommand(type, args)
  }
  return [command, type].join('_') + ' ' + result
}