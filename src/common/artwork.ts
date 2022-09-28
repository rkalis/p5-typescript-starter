import { Attributes, Palette, Size } from './attributes';
import { Random } from './random-generator';
type P5 = import('p5');

// This function draws the actual art work, it takes a p5js object, a random generator, an object of attributes, and
// a canvas size. It is recommended to adjust the dimensions of your art work dynamically based on the canvas size
// so that the art work looks the same regardless of what size it is rendered at. These parameters will automatically
// be passed to this function
export const draw = (p5: P5, random: Random, attributes: Attributes, canvasSize: number) => {
  p5.clear();
  p5.background('#eee');

  const size = canvasSize * Size[attributes.size]
  const [color] = Palette[attributes.palette]
  const start = canvasSize / 2 - size / 2;

  p5.stroke('#000')
  p5.fill(color)

  p5.square(start, start, size)
};
