import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'
import { saveState, loadState } from './localStorage'


const persistedState = loadState()
const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    saveState({
        todos: store.getState().todos
    })
})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
