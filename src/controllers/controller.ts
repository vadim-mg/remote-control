import { mouseCommand, drawCommand } from "./mouseController.js"

export const controller = async (message: string): Promise<string | undefined> => {

  console.log(message)


  const [command, type, ...args] = message.split(/\ |\_/)

  // console.log(command)
  // console.log(type)
  console.log(args)
  switch (command) {
    case 'mouse':
      return (await mouseCommand(type, args))
    case 'draw':
      return (await drawCommand(type, args))
    default:
      return undefined
  }
}