import { mouse, Region, screen, Point } from "@nut-tree/nut-js";
import Jimp from 'jimp';

const PRINT_SCREEN_AREA_SIZE = 200


const getScreenArea = (
  point: Point,
  screenWidth: number,
  screenHight: number,
  areaSize: number
): Region => new Region(
  Math.min(Math.max(point.x - Math.round(areaSize / 2), 0), screenWidth - areaSize),
  Math.min(Math.max(point.y - Math.round(areaSize / 2), 0), screenHight - areaSize),
  areaSize,
  areaSize
)


const getPartScreen = async (areaSize: number) => {
  return Promise.all([
    mouse.getPosition(),
    screen.width(),
    screen.height()
  ])
    .then((values) => getScreenArea(...values, areaSize))
    .then(region => screen.grabRegion(region))
    .then(img => img.toRGB())
    .then(img => new Jimp(img).getBufferAsync(Jimp.MIME_PNG))
    .then(buf => buf.toString('base64'))
    .catch(err => {
      console.error(err)
      return ''
    })
}


const printCommand = async (type: string, args?: string[]) => {
  if (type === "scrn") {
    return await getPartScreen(PRINT_SCREEN_AREA_SIZE)
  }
  return ''
}


export { printCommand }