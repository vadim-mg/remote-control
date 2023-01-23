import { mouse, Point, Button, Region, straightTo, getActiveWindow } from "@nut-tree/nut-js";


const drawAccuracy = async (point: Point, region: Region) => {
  await mouse.pressButton(Button.LEFT)
  await mouse.move(await straightTo(point))
  await mouse.releaseButton(Button.LEFT)
  if (!inRegion(point, region)) {
    throw Error('MouseOverCurrentWindow')
  }
}


const inRegion = (point: Point, region: Region) => {
  if (point.x < region.left
    || point.x > region.left + region.width
    || point.y < region.top
    || point.y > region.top + region.height) {
    return false
  }
  return true
}


const drawRectangle = async (width: number, length: number) => {
  const activeWindow = await getActiveWindow()
  const region = await activeWindow.region
  const point = await mouse.getPosition()

  point.x += width
  await drawAccuracy(point, region)
  point.y += length
  await drawAccuracy(point, region)
  point.x -= width
  await drawAccuracy(point, region)
  point.y -= length
  await drawAccuracy(point, region)
  return ''
}


const drawCircle = async (width: number) => {
  const activeWindow = await getActiveWindow()
  const region = await activeWindow.region

  const r = width / 2
  const countPoints = 720
  const rad = Math.PI * 2 / countPoints

  const startPoint = await mouse.getPosition()

  let point = new Point(startPoint.x, startPoint.y)

  let i = 0
  await mouse.pressButton(Button.LEFT)
  while (i++ <= countPoints) {
    point.x = Math.round(startPoint.x + r - r * Math.cos(rad * i))
    point.y = Math.round(startPoint.y + r * Math.sin(rad * i))
    if (!inRegion(point, region)) {
      await mouse.releaseButton(Button.LEFT)
      throw Error('MouseOverCurrentWindow')
    }
    await mouse.move(await straightTo(point))
  }
  await mouse.releaseButton(Button.LEFT)
  return ''
}


const drawCommand = async (type: string, [width, length]: string[]) => {
  switch (type) {
    case 'rectangle':
      return await drawRectangle(+width, +length)
    case 'square':
      return await drawRectangle(+width, +width)
    case 'circle':
      return await drawCircle(+width)
    default:
      return ''
  }
}


export { drawCommand }