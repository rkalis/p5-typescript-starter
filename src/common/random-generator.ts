// This random class is a TypeScript port of the one provided by Art Blocks.
// It includes all the utility functions provided by Art Blocks as well as
// some additional utiity functions. Before distribution it can make sense to
// remove the utility functions you're not using to reduce the script size.

export class Random {
  useA: boolean;
  prngA: () => number;
  prngB: () => number;

  constructor(tokenHash: string) {
    this.useA = false;
    let sfc32 = function (uint128Hex: string) {
      let a = parseInt(uint128Hex.substr(0, 8), 16);
      let b = parseInt(uint128Hex.substr(8, 8), 16);
      let c = parseInt(uint128Hex.substr(16, 8), 16);
      let d = parseInt(uint128Hex.substr(24, 8), 16);
      return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = sfc32(tokenHash.substr(2, 32));
    // seed prngB with second half of tokenData.hash
    this.prngB = sfc32(tokenHash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }

  // These random functions were provided by the "base" Art Blocks class:

  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a: number, b: number) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a: number, b: number) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p: number) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice<T>(list: T[]): T {
    return list[this.random_int(0, list.length - 1)];
  }

  // These additional functions were added on top of the Art Blocks random generator:

  // Shuffle an array randomly
  shuffle<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: this.random_dec() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  // Pick a weighted random option from an array of [option, weight] tuples
  random_choice_weighted<T>(options: [T, number][]): T {
    const totalProbabilities = options.reduce((total, [, probability]) => total + probability, 0);
    const randomness = this.random_num(0, totalProbabilities);
    let accumulator = 0;

    for (let [value, probability] of options) {
      accumulator += probability;
      if (randomness < accumulator) return value;
    }

    // Should never happen
    throw new Error();
  }
}
