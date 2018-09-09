import { createStore } from 'redux'
import rootReducer from './reducers'

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch
    return (action) => {
        console.groupCollapsed(action.type)
        console.log('%c pre state ', 'background-color:gray;color:#fff;', store.getState())
        console.log('%c action ', 'background-color:blue;color:#fff;', action)
        const returnValue = rawDispatch(action)
        console.log('%c post state ', 'background-color:green;color:#fff;', store.getState())
        console.groupEnd()
        return returnValue
    }
}
const configureStore = () => {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store)
    }

    return store
}

export default configureStore