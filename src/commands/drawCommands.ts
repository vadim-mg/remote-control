import { mouse, Point, Button, straightTo } from "@nut-tree/nut-js";


const drawAccuracy = async (x: number, y: number) => {
  await mouse.pressButton(Button.LEFT)
  await mouse.move(straightTo(new Point(x, y)))
  await mouse.releaseButton(Button.LEFT)
}

const draw_rectangle = async (width: number, length: number) => {
  const { x, y } = await mouse.getPosition()
  await drawAccuracy(x + width, y)
  await drawAccuracy(x + width, y + length)
  await drawAccuracy(x, y + length)
  await drawAccuracy(x, y)
  return ''
}


// написать обработку для больших чисел!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

const draw_circle = async (width: number) => {
  const r = width / 2
  const countPoints = width * 2

  const startPoint = await mouse.getPosition()
  let point = new Point(startPoint.x, startPoint.y)

  let i = 0
  await mouse.pressButton(Button.LEFT)
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
    i += 2
  }
  await mouse.releaseButton(Button.LEFT)
  return ''
}


const drawCommand = async (type: string, [width, length]: string[]) => {
  switch (type) {
    case 'rectangle':
      return await draw_rectangle(+width, +length)
    case 'square':
      return await draw_rectangle(+width, +width)
    case 'circle':
      return await draw_circle(+width)
    default:
      return ''
  }
}


export { drawCommand }