import { mouseCommand } from "./mouseController.js"

export const controller = async (message: string): Promise<string | undefined> => {

  console.log(message)

  
  const parsedMessage = message.split(/\ |\_/)

  console.log(parsedMessage)
  switch (parsedMessage[0]) {
    case 'mouse':
      return (await mouseCommand(parsedMessage[1], +parsedMessage[2]))
    case 'draw':
      return message;
    default:
      return undefined
  }
}