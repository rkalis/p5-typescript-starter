import { Random } from '../common/random-generator';
import { generateAttributes } from '../common/attributes';
import { draw as drawInternal } from '../common/artwork';

// Declare globally available tokenData variable
declare const tokenData: any;

// Dimension calculation
const CANVAS_SIZE = Math.min(window.innerWidth, window.innerHeight);

function setup() {
  (window as any).createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  (window as any).noLoop();
  (window as any).noStroke();
}

function draw() {
  // Random generator provided by Art Blocks
  const RANDOM = new Random(tokenData.hash);

  // Generate attributes first
  const attributes = generateAttributes(RANDOM);

  // P5 methods are defined on the window object, so we can pass 'window' in the place of a p5 object
  drawInternal(window as any, RANDOM, attributes, CANVAS_SIZE);
}

// Add useless console.log to make sure that setup() and draw() don't get tree-shaken
// GETS REMOVED AFTER ROLLUP STEP
console.log(setup, draw);
