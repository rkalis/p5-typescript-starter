import { mkdirSync, rmdirSync } from 'fs';
import { join } from 'path';
import { genTokenData } from '../common/utils';
import { draw } from '../common/artwork';
import { Random } from '../common/random-generator';
import { generateAttributes } from '../common/attributes';

const p5 = require('node-p5');

const CANVAS_SIZE = 1000;
const OUTPUTS_DIR = join(__dirname, '..', '..', 'out', 'test-outputs');

const sketch = (p5: any) => {
  let canvas: any;
  p5.setup = () => {
    canvas = p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    p5.noLoop();
    p5.noStroke();
  }

  p5.draw = () => {
    const tokenData = genTokenData(176);
    const random = new Random(tokenData.hash);

    const attributes = generateAttributes(random);
    draw(p5, random, attributes, CANVAS_SIZE);
    // displayAttributes(p5, attributes);

    p5.saveCanvas(canvas, join(OUTPUTS_DIR, String(tokenData.hash)), 'png');
  }
}

rmdirSync(OUTPUTS_DIR, { recursive: true });
mkdirSync(OUTPUTS_DIR, { recursive: true });

for (let i = 0; i < Number.parseInt(process.argv[2], 10); i++) {
  p5.createSketch(sketch);
}
