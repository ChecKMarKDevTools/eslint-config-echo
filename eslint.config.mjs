/**
 * ESLint v9+ Flat Config (ESM wrapper)
 *
 * Source-of-truth lives in `config/echo-flat.cjs` so ESLint v8 (CJS) and v9 (ESM)
 * both consume the same rules.
 */

import echoConfig from './config/echo-flat.cjs';

export default echoConfig;
