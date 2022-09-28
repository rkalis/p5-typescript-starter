import { Attributes } from './attributes';
type P5 = import('p5');

// This is a utility function to "simulate" the token data generation process that Art Blocks uses
// This data is used as a seed for the random generation aspect of the art work
export const genTokenData = (projectNum: number) => {
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }

  const tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();

  return { hash, tokenId };
}

// This function is used to display a list of attributes, overlayed on the generated art work
// which can be helpful during development.
export const displayAttributes = (p5: P5, attributes: Attributes) => {
  const FONT_SIZE = 12;
  p5.fill('black');
  p5.noStroke();
  p5.textSize(FONT_SIZE);

  Object.entries(attributes).forEach(([key, value], i) => {
    p5.text(`${key}: ${value}`, 0.5 * FONT_SIZE, FONT_SIZE * (i + 1.5));
  })
};
