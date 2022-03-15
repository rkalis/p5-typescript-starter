import { useEffect, useState } from 'react';
import Sketch from 'react-p5';
import { draw as drawInternal } from './common/artwork';
import { Random } from './common/random-generator';
import { generateAttributes, displayAttributes } from './common/attributes';
type P5 = import('p5');

interface Props {
  tokenData: {
    hash: string;
    tokenId: string;
  };
  canvasSize: number;
  drawAttributes?: boolean;
}

function Artwork({ tokenData, canvasSize, drawAttributes }: Props) {
  const [storedP5, setStoredP5] = useState<P5>();

  useEffect(() => {
    if (storedP5 && tokenData) storedP5.redraw();
  }, [tokenData, storedP5])

  const setup = (p5: P5, canvasParentRef: Element) => {
    setStoredP5(p5);
    p5.createCanvas(canvasSize, canvasSize).parent(canvasParentRef);
    p5.noLoop();
    p5.noStroke();
  };

  const draw = (p5: P5) => {
    const random = new Random(tokenData.hash);
    const attributes = generateAttributes(random);
    drawInternal(p5, random, attributes, canvasSize);
    drawAttributes && displayAttributes(p5, attributes);
  }

  return (
    <Sketch setup={setup} draw={draw} />
  );
}

export default Artwork;
