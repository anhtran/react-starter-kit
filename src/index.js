import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'

let store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  )
}

const root = document.getElementById('root')
if (root) {
  ReactDOM.render(<Provider store={store}><App /></Provider>, root)
}
