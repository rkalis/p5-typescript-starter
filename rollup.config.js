import commonjs from '@rollup/plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-cpy';
import { uglify } from "rollup-plugin-uglify";

const config = [
  {
    input: 'dist/distribution/distribution.js',
    output: [{ file: 'out/dist.js', format: 'cjs' }],
    plugins: [
      commonjs(),
      cleanup(),
      copy({
        files: ['src/distribution/index.html'],
        dest: 'out',
      }),
      uglify(),
    ],
  },
  {
    input: 'dist/distribution/features.js',
    output: [{ file: 'out/features.js', format: 'cjs' }],
    plugins: [cleanup()],
  },
];

export default config;
