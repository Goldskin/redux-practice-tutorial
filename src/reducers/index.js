import { combineReducers } from 'redux'
import todos, * as fromtodos from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
    todos,
    visibilityFilter
})

export const getVisibleTodos = (state, filter) =>
    fromtodos.getVisibleTodos(state.todos, filter)