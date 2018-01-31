const composeReducers = require('index.js')

describe('redux state is modified by each reducer in composed chain', function() {

  const reducer_1 = (state, action) => state + 1
  const reducer_2 = (state, action) => state - 1

  const reducer_chain_1 = composeReducers(reducer_1, reducer_2)             // (state, action) => state + 1 - 1
  const reducer_chain_2 = composeReducers(reducer_chain_1, reducer_1)       // (state, action) => state + 1 - 1 + 1
  const reducer_chain_3 = composeReducers(reducer_chain_1, reducer_2)       // (state, action) => state + 1 - 1 - 1
  const reducer_chain_4 = composeReducers(reducer_chain_2, reducer_chain_3) // (state, action) => state + 1 - 1 + 1 + 1 - 1 - 1

  it('should confirm the behavior of the normal reducers', function() {
    expect( reducer_1(      5, {}) ).toBe(6)
    expect( reducer_2(      5, {}) ).toBe(4)
  })

  it('should compose 2 normal reducers', function() {
    expect( reducer_chain_1(5, {}) ).toBe(5)
  })

  it('should compose a composed reducer with a normal reducer', function() {
    expect( reducer_chain_2(5, {}) ).toBe(6)
    expect( reducer_chain_3(5, {}) ).toBe(4)
  })

  it('should compose 2 composed reducers', function() {
    expect( reducer_chain_4(5, {}) ).toBe(5)
  })
})

describe('validate order of execution by storing a trace log', function() {

  const reducer_1 = (state, action) => state + ' +1'
  const reducer_2 = (state, action) => state + ' -1'

  const reducer_chain_1 = composeReducers(reducer_1, reducer_2)             // (state, action) => state +1 -1
  const reducer_chain_2 = composeReducers(reducer_chain_1, reducer_1)       // (state, action) => state +1 -1 +1
  const reducer_chain_3 = composeReducers(reducer_chain_1, reducer_2)       // (state, action) => state +1 -1 -1
  const reducer_chain_4 = composeReducers(reducer_chain_2, reducer_chain_3) // (state, action) => state +1 -1 +1 +1 -1 -1

  it('should confirm the behavior of the normal reducers', function() {
    expect( reducer_1(      'state', {}) ).toBe('state +1')
    expect( reducer_2(      'state', {}) ).toBe('state -1')
  })

  it('should compose 2 normal reducers', function() {
    expect( reducer_chain_1('state', {}) ).toBe('state +1 -1')
  })

  it('should compose a composed reducer with a normal reducer', function() {
    expect( reducer_chain_2('state', {}) ).toBe('state +1 -1 +1')
    expect( reducer_chain_3('state', {}) ).toBe('state +1 -1 -1')
  })

  it('should compose 2 composed reducers', function() {
    expect( reducer_chain_4('state', {}) ).toBe('state +1 -1 +1 +1 -1 -1')
  })
})
