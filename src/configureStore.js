import { createStore } from 'redux'
import rootReducer from './reducers'

const logger = store => next => action => {
    console.groupCollapsed(action.type)
    console.log('%c pre state ', 'background-color:gray;color:#fff;', store.getState())
    console.log('%c action ', 'background-color:blue;color:#fff;', action)
    const returnValue = next(action)
    console.log('%c post state ', 'background-color:green;color:#fff;', store.getState())
    console.groupEnd()
    return returnValue
}

const promise = store => next => action => {
    if (typeof action.then === 'function') {
        return action.then(next)
    }
    return next(action)
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares.slice().reverse().forEach(middleware => {
        store.dispatch = middleware(store)(store.dispatch)
    });
}



const configureStore = () => {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    const middlewares = [promise]

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger)
    }
    
    wrapDispatchWithMiddlewares(store, middlewares)

    return store
}

export default configureStore