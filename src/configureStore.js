import { createStore } from 'redux'
import rootReducer from './reducers'
import { saveState, loadState } from './localStorage'
import throttle from 'lodash/throttle'

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
    const persistedState = loadState()
    const store = createStore(
        rootReducer,
        persistedState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store)
    }

    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        })
    }), 1000)

    return store
}

export default configureStore