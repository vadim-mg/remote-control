import { mouse, left, up, right, down, Point, Button, straightTo } from "@nut-tree/nut-js";

const DIRECTIONS: { [key: string]: Function } = {
  up,
  down,
  left,
  right,
}

// const pointToString = (point: Point) => `mouse_position ${point.x},${point.y}`

const draw_rectangle = async (width: number, length: number) => {
  await mouse.move(right(width))
  await mouse.move(down(length))
  await mouse.move(left(width))
  await mouse.move(up(length))
}

const draw_circle = async (width: number) => {
  const r = width / 2
  const countPoints = width * 2

  const startPoint: Point = await mouse.getPosition().then(val => val)
  let point = new Point(startPoint.x, startPoint.y)

  let i = 0
  while (i <= countPoints) {
    let x = i < width ? i : countPoints - i
    let y = (i < width ? 1 : -1) * Math.sqrt(Math.pow(r, 2) - Math.pow(r - x, 2))
    point.x = Math.round(startPoint.x + x)
    point.y = Math.round(startPoint.y + y)
    await mouse.move(straightTo(point))

    if (i === width || i === countPoints) {
      point.y = startPoint.y //fit lasts point for semicircle
      await mouse.move(straightTo(point))
    }
    i++
  }
}

const mouseCommand = async (type: string, args: string[]) => {
  if (type === 'position') {
    return await mouse.getPosition().then((point: Point) => `mouse_position ${point.x},${point.y}`)
  }
  await mouse.move(DIRECTIONS[type](+args[0]))
  return type
}


const drawCommand = async (type: string, args: string[]) => {
  await mouse.pressButton(Button.LEFT)

  if (type === 'rectangle') {
    await draw_rectangle(+args[0], +args[1])
  }
  if (type === 'square') {
    await draw_rectangle(+args[0], +args[0])
  }
  if (type === 'circle') {
    await draw_circle(+args[0])
  }

  await mouse.releaseButton(Button.LEFT)

  return type
}

export { mouseCommand, drawCommand }