import { execSync } from 'child_process';
import { mkdirSync, readdirSync, rmdirSync } from 'fs';
import { join } from 'path';

// https://stackoverflow.com/questions/40682103/splitting-an-array-up-into-chunks-of-a-given-size
export const splitArrayInChunks = <T>(array: T[], chunkSize: number) => {
  var arrayOfChunks: T[][] = [];
  for(var i = 0; i < array.length; i += chunkSize) {
    arrayOfChunks.push(array.slice(i, i + chunkSize));
  }
  return arrayOfChunks;
}

const OUTPUTS_DIR = join(__dirname, '..', '..', 'out', 'test-outputs');
const GRIDS_DIR = join(__dirname, '..', '..', 'out', 'test-grids');

rmdirSync(GRIDS_DIR, { recursive: true });
mkdirSync(GRIDS_DIR, { recursive: true });

const sortedFiles = readdirSync(OUTPUTS_DIR)
  .filter((filename) => filename.endsWith('.png'))
  .map((filename) => join(OUTPUTS_DIR, filename))

const chunks = splitArrayInChunks(sortedFiles, 100);

chunks.forEach((chunk, i) => {
  const montageCommand = `montage -tile 4x -geometry 1000x1000+20+20 ${chunk.join(" ")} ${join(GRIDS_DIR, `grid_${i}.png`)}`;
  execSync(montageCommand);
})
