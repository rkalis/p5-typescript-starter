import { Attributes, Palette, Size } from './attributes';
import { Random } from './random-generator';

type P5 = import('p5');

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
