import { createStore } from 'redux'
import rootReducer from './reducers'
import { saveState, loadState } from './localStorage'
import throttle from 'lodash/throttle'


const configureStore = () => {
    const persistedState = loadState()
    const store = createStore(
        rootReducer,
        persistedState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        })
    }), 1000)

    return store
}

export default configureStore