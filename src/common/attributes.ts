import { Random } from './random-generator';

// Interface for your Attributes object, add all your attributes and their types here
export interface Attributes {
  palette: keyof typeof Palette;
  size: keyof typeof Size;
}

// These are values of your attributes, e.g. a 'RED' palette corresponds to the color #f00, and a 'BIG' size is 0.6.

export const Palette = {
  RED: ['#f00'],
  BLUE: ['#00f'],
}

export const Size = {
  BIG: 0.6,
  MEDIUM: 0.4,
  SMALL: 0.2,
}

// This function generates your art work's "attributes". These attributes are later used to draw your art work.
// A random generator is provided as a parameter to this function, which should be used for all random generation.
export const generateAttributes = (random: Random): Attributes => {
  // This object contains the "probabilities" of each choice being selected using random_choice_weighted.
  // You may want to use more advanced or interdependent ways of generating attributes, but this is a good start.
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

  const palette = random.random_choice_weighted(probabilities.palette);
  const size = random.random_choice_weighted(probabilities.size);
  const attributes = { palette, size };

  return attributes;
}

// These fields are added to the React app to show some more context
export const metadata = {
  title: '<Title>',
  artist: '<Artist>',
  attributes: {
    Palette: 'A description about the palette attribute...',
    Size: 'A description about the size attribute...'
  }
}
