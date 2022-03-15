import { Random } from './random-generator';

type P5 = import('p5');

export const Palette = {
  RED: ['#f00'],
  BLUE: ['#00f'],
}

export const Size = {
  BIG: 0.6,
  MEDIUM: 0.4,
  SMALL: 0.2,
}

export interface Attributes {
  palette: keyof typeof Palette;
  size: keyof typeof Size;
}

const probabilities = {
  palette: [
    ['RED', 30],
    ['BLUE', 70],
  ] as [keyof typeof Palette, number][],
  size: [
    ['BIG', 30],
    ['MEDIUM', 40],
    ['SMALL', 30],
  ] as [keyof typeof Size, number][],
}

export const generateAttributes = (random: Random): Attributes => {
  const palette = random.random_choice_weighted(probabilities.palette);
  const size = random.random_choice_weighted(probabilities.size);
  const attributes = { palette, size };

  return attributes;
}

export const displayAttributes = (p5: P5, attributes: Attributes) => {
  p5.fill('black');
  p5.noStroke();
  p5.textSize(12);
  p5.text(`Palette: ${attributes.palette}`, 10, 12);
  p5.text(`Size: ${attributes.size}`, 10, 24);
};
