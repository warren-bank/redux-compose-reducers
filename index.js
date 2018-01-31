const { compose } = require('redux')

const get_chain_wrapped_reducers = reducers => {
  const chain = []

  for (let i=reducers.length-1; i>=0; i--) {
    const reducer = reducers[i]
    const link = ([state, action]) => {
      const newState = reducer(state, action)
      return [newState, action]
    }
    chain.push(link)
  }

  return chain
}

const get_composed_wrapped_reducers = reducers => {
  const chain    = get_chain_wrapped_reducers(reducers)
  const composed = compose(...chain)
  return composed
}

const composeReducers = (...reducers) => {
  const composed = get_composed_wrapped_reducers(reducers)

  const rootReducer = (...args) => {
    const [newState,] = composed(args)
    return newState
  }

  return rootReducer
}

module.exports = composeReducers
