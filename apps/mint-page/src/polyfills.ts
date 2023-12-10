/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Buffer } from 'buffer';

declare global {
  interface Window {
    global: Window & typeof globalThis;
  }
}

window.global = window;
global.Buffer = Buffer;
