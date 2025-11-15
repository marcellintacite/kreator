import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'sidepanel/index.js',
  output: {
    file: 'dist/sidepanel.bundle.js',
    format: 'iife',
    name: 'sidepanelApp'
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs()
  ]
};
