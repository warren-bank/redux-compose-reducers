window.require = path => {
  switch(path) {
    case "index.js":
      return window.composeReducers
    case "redux":
      return window.Redux
  }
}
