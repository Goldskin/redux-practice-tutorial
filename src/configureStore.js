import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import {createLogger} from 'redux-logger'
import promise from 'redux-promise'

const typicalMiddleware = store => next => action => next(action)
const thunk = store => next => action =>
    typeof action === 'function' ? 
        action(store.dispatch) :
        next(action)

const configureStore = () => {
    const middlewares = [promise, typicalMiddleware, thunk]
    const argument = [rootReducer]

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger())
        argument.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    }

    argument.push(applyMiddleware(...middlewares))
    return createStore(...argument)
}

export default configureStore