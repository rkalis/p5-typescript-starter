import { generateAttributes } from '../common/attributes';
import { Random } from '../common/random-generator';

function calculateFeatures(tokenData: any) {
  const RANDOM = new Random(tokenData.hash);
  const attributes = generateAttributes(RANDOM);
  return {
    Palette: attributes.palette,
    Size: attributes.size,
  }
}

// Add useless console.log to make sure that setup() and draw() don't get tree-shaken
// GETS REMOVED AFTER ROLLUP STEP
console.log(calculateFeatures);
