import { mouse, left, up, right, down, Point } from "@nut-tree/nut-js";

const DIRECTIONS: { [key: string]: Function } = {
  up,
  down,
  left,
  right,
}

const pointToString = (point: Point) => `x:${point.x},y:${point.y}`

export const mouseCommand = async (type: string, arg: number) => {
  if (type === 'position') {
    return pointToString(await mouse.getPosition())
  }
  await mouse.move(DIRECTIONS[type](arg))
  return type
}