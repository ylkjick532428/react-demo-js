import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'

function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0
  }

  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counter);

const rootElement = document.getElementById('root')
console.log(rootElement, store);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)