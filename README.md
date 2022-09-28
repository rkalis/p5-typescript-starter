# p5.js TypeScript Starter

This template includes boilerplate code to create a generative art project using p5.js with TypeScript.

It includes a React app with hot reloading, which makes it very easy to develop your project since changes are reflected immediately. The template also contains test-run scripts that will output grids of multiple generated works. Finally, it includes distribution scripts that allow you to export the script as a minified standalone script for distribution on platforms like Art Blocks.

Note that this starter is specifically built for static art works, so if you're building animated art you will need to make significant changes.

## Setup

This repository assumes you have Node.js and Yarn installed. The test-run scripts also require the `montage` CLI tool that is included with [ImageMagick](https://imagemagick.org/).

```
yarn install
```

## Development

The files regarding the React app are included under `src/`. The files for the test-run scripts are included under `src/test-run`. The files for Art Blocks distribution are included under `src/distribution`. None of these files need to be adjusted, but you can take a look at the code to see what it does technically.

The only files that you need to edit are `src/common/attributes.ts` and `src/common/artwork.ts`. `src/common/attributes.ts` is responsible for generating the "attributes" for your art work (e.g. color palette). `src/common/artwork.ts` is responsible for then drawing the actual art work to a canvas using p5.js based on the earlier generated attributes.

### Attributes

`src/common/attributes.ts` needs to export a few things (as are incldued in the example project):

```ts
interface Attributes { ... };
function generateAttributes(random: Random): Attributes;
const metadata = { title, artist, attributes }
```

`Attributes` represents the types of the attributes that your art work uses. `generateArtwork` should use the passed `Random` generator to determine all the artwork's attributes such as dimensions and color palettes. These attributes can then be used in the drawing process. `metadata` should include some additional info about the project, which gets displayed in the React app during development.

### Draw script

`src/common/artwork.ts` needs to export a function with the following signature (as is included in the example project):

```ts
function draw(p5: P5, random: Random, attributes: Attributes, canvasSize: number): void;
```

This function will need to handle all the drawing aspects of your artwork, based on the passed attributes and canvas size.

### Note on random generation

You will notice that both `generateAttributes` and `draw` use a `Random` object. Only this object should be used for random generation, because this generator functions based on a seed that gets passed in during generation. JavaScript's `Math.random` does not allow using seeds for random generation. The provided `Random` object is based on the official one provided by Art Blocks to their artists, which has been updated with some additional utility functions.

## React app

During development, the easiest way to test your script is the React web app. This automatically reflects any changes made to the live script. To share WIP versions of your script, you can also host this React app and share the hosted URL. A `Dockerfile` is included in this repository that can be used for Docker-based hosting.

```
yarn start
```

## Test runs

It can be useful to perform "test runs" of the script during development to see what the distribution of your attributes and combinations are. Running the test run script will generate the specified number of artworks in `out/test-outputs` as well as number of 4x25 artwork grids for easier browsing under `out/test-grids`. Note that this generation may take a while.

```
yarn test-run <number of artworks>
```

## Art Blocks distribution

Once your script is ready to be distributed on Art Blocks you can run the distribution script. This creates a minified version of your script that is ready to be distributed under `out/dist.js`. This script can be tested locally by opening `out/index.html`, which should render standalone artworks.

The distribution script also creates a "features script" under `out/features.js`. For this features script to work with Art Blocks, you need to manually move *all* of the code into the `calculateFeatures(tokenData)` before adding it to your Art Blocks shell.

```
yarn distribution
```
