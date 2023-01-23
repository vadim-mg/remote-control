import { mouse, left, up, right, down } from "@nut-tree/nut-js";


const moveUp = async (px: number) => {
  await mouse.move(up(px))
  return ''
}


const moveDown = async (px: number) => {
  await mouse.move(down(px))
  return ''
}


const moveLeft = async (px: number) => {
  await mouse.move(left(px))
  return ''
}


const moveRight = async (px: number) => {
  await mouse.move(right(px))
  return ''
}


const position = async () => {
  const point = await mouse.getPosition()
  return `${point.x},${point.y}`
}


const mouseCommand = async (type: string, [px]: string[]) => {
  switch (type) {
    case 'position':
      return await position()
    case 'up':
      return await moveUp(+px)
    case 'down':
      return await moveDown(+px)
    case 'left':
      return await moveLeft(+px)
    case 'right':
      return await moveRight(+px)
    default:
      return ''
  }
}


export { mouseCommand }