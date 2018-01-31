### [redux-compose-reducers](https://github.com/warren-bank/redux-compose-reducers)

#### Summary:

chains together a series of reducer functions through functional composition

#### Installation:

```bash
npm install --save '@warren-bank/redux-compose-reducers'
```

#### Usage Example:

```javascript
const composeReducers = require('@warren-bank/redux-compose-reducers')

const reducer_1 = (state, action) => state + 1
const reducer_2 = (state, action) => state - 1

const reducer_chain_1 = composeReducers(reducer_1, reducer_2)             // (state, action) => state + 1 - 1
const reducer_chain_2 = composeReducers(reducer_chain_1, reducer_1)       // (state, action) => state + 1 - 1 + 1
const reducer_chain_3 = composeReducers(reducer_chain_1, reducer_2)       // (state, action) => state + 1 - 1 - 1
const reducer_chain_4 = composeReducers(reducer_chain_2, reducer_chain_3) // (state, action) => state + 1 - 1 + 1 + 1 - 1 - 1

expect( reducer_1(      5, {}) ).toBe(6)
expect( reducer_2(      5, {}) ).toBe(4)

expect( reducer_chain_1(5, {}) ).toBe(5)
expect( reducer_chain_2(5, {}) ).toBe(6)
expect( reducer_chain_3(5, {}) ).toBe(4)
expect( reducer_chain_4(5, {}) ).toBe(5)
```

#### Browser Build (transpiled to ES5):

* files in repo:
  * [minified javascript](https://github.com/warren-bank/redux-compose-reducers/blob/master/browser-build/dist/compose_reducers.js)
  * [source map](https://github.com/warren-bank/redux-compose-reducers/blob/master/browser-build/dist/compose_reducers.map)

* files hosted in CDN:
  * [minified javascript](https://cdn.rawgit.com/warren-bank/redux-compose-reducers/master/browser-build/dist/compose_reducers.js)
  * [source map](https://cdn.rawgit.com/warren-bank/redux-compose-reducers/master/browser-build/dist/compose_reducers.map)

* run the _usage example_:
  * [unit tests w/ mocha](https://cdn.rawgit.com/warren-bank/redux-compose-reducers/master/browser-build/tests/index.html)

* global variable(s):
  * window.composeReducers

#### Related Works:

* [https://github.com/micro-js/compose-reducers](https://github.com/micro-js/compose-reducers/blob/master/lib/index.js)
  * same outcome
  * different methodology
    * calls each reducer in a loop
      * doesn't use functional composition

* [https://github.com/palantir/redoodle](https://github.com/palantir/redoodle/blob/master/src/composeReducers.ts)
  * nearly identical to `@micro-js/compose-reducers`
  * adds TypeScript definitions
    * restricts input/output value types
      * disallows the "composed" reducer to be used for initialization
        * `state` cannot be `undefined`

* [https://github.com/acdlite/reduce-reducers](https://github.com/acdlite/reduce-reducers/blob/master/src/index.js)
  * similar methodology to `@micro-js/compose-reducers`
    * makes clever use of `Array.reduce()` to iterate through the reducers in a loop
      * doesn't use functional composition

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
