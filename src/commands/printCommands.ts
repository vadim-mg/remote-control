import { mouse, Region, screen } from "@nut-tree/nut-js";
import Jimp from 'jimp';


const getPartScreen = async (areaSize: number) => {
  const point = await mouse.getPosition()
  const maxX = await screen.width()
  const maxY = await screen.height()

  const region = new Region(
    Math.min(Math.max(point.x - Math.round(areaSize / 2), 0), maxX - areaSize),
    Math.min(Math.max(point.y - Math.round(areaSize / 2), 0), maxY - areaSize),
    areaSize,
    areaSize
  )

  const grabbedImage = await (await screen.grabRegion(region)).toRGB()

  return await new Jimp(grabbedImage)
    .getBase64Async('image/png')
    .then(val => val.replace('data:image/png;base64,', ''))

}


const printCommand = async (type: string, args?: string[]) => {
  if (type === "scrn") {
    return await getPartScreen(200)
  }
  return ''
}


export { printCommand }