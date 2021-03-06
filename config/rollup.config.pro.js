const path = require('path');
import config from './../package.json';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const FORMAT = process.env.FORMAT;
export default {
  input: path.resolve(__dirname, './../src/index.js'),
  output: {
    file: `dist/${config.name}.min.js`,
    format: `${FORMAT}`,
    name: 'sendjs'
  },
  plugins: [
    resolve({
      jsnext: true, // 该属性是指定将Node包转换为ES2015模块
      // main 和 browser 属性将使插件决定将那些文件应用到bundle中
      main: true, // Default: true
      browser: true // Default: false
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify()
  ]
};
