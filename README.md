# p5.js starter

This template includes boilerplate code to create a generative art project using p5.js. It includes a React app with hot reloading, which makes it very easy to develop you rproject since changes are reflected immediately. The template also contains test-run scripts that will output grids of multiple generated works. Finally, it includes distribution scripts that allow you to export the script as a minified standalone script for distribution on platforms like Art Blocks.

## Setup

This repository assumes you have Node.js and Yarn installed. The test-run scripts also require the `montage` CLI tool that is incldued with [ImageMagick](https://imagemagick.org/).

```
yarn install
```

## Development

The files regarding the React app are included under `src/`. The only thing you need to edit is the `src/App.tsx` file, where you can add a title and some text explaining your project if so desired.

The files for the test-run scripts are included under `src/test-run`. The files for Art Blocks distribution are included under `src/distribution`. Both of these directories can be ignored.

The only files that you need to edit are `src/common/artwork.ts` and `src/common/attributes.ts`.

### Attributes

`src/common/attributes.ts` needs to exmport two functions with the following signatures (as are included in the example project):

```ts
function generateAttributes(random: Random) => Attributes;
function displayAttributes(p5: P5, attributes: Attributes) => void;
```

`generateAttributes` should use the passed `Random` generator to determine all the artwork's attributes such as dimensions and color palettes. These attributes can then be used in the drawing process. `displayAttributes` can be used to draw a text representation of the attributes. This text representation will be displayed in the React app for easier debugging.

### Draw script

`src/common/artwork.ts` needs to export at least a function with the following signature (as is included in the example project):

```ts
function draw(p5: P5, random: Random, attributes: Attributes, canvasSize: number) => void;
```

This functions will need to handle all the drawing aspects of your artwork, based on the passed attributes and canvas size.

## React app

During development, the easiest way to test your script is the React web app. This automatically reflects any changes made to the live script.

```
yarn start
```

## Test runs

It can be useful to perform "test runs" of the script during development to see what the distribution of your attributes and combinations are. Running the test run script will generate the specified number of artworks in `out/test-outputs` as well as number of 4x25 artwork grids for easier browsing under `out/test-grids`.

```
yarn test-run <number of artworks>
```

## Art Blocks distribution

Once your script is ready to be distributed on Art Blocks you can run the distribution script. This creates a minified version of your script that is ready to be distributed under `out/dist.js`. This script can be tested locally by opening `out/index.html`, which should render standalone artworks.

The distribution script also creates a "features script" under `out/features.js`. For this features script to work with Art Blocks, you need to manually move *all* of the code into the `calculateFeatures(tokenData)` before adding it to your Art Blocks shell.

```
yarn distribution
```
