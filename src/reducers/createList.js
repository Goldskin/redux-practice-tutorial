import { combineReducers } from "redux";
import { FETCH_TODOS, ADD_TODO, VisibilityFilters, TOGGLE_TODO } from "../const";

const createList = (filter) => {
    const handleToggle = (state, action) => {
        console.log('state', state)
        
        const { result: toggledId, entities} = action.response
        const { completed } = entities.todos[toggledId]
        const shouldRemove = (
            (completed && filter === VisibilityFilters.SHOW_ACTIVE) ||
            (!completed && filter === VisibilityFilters.SHOW_COMPLETED)
        )
        return shouldRemove ?
            state.filter(id => id !== toggledId) :
            state
    }

    const ids = (state = [], action) => {
        switch (action.type) {
            case FETCH_TODOS.SUCCESS:
                return action.filter === filter ?
                    action.response.result :
                    state
            case ADD_TODO.SUCCESS:
                return action.filter !== VisibilityFilters.SHOW_COMPLETED ?
                    [ ...state, action.response.result ] :
                    state
            case TOGGLE_TODO.SUCCESS:
                return handleToggle(state, action)
            default:
                return state
        }
    }

    const isFetching = (state = false, action) => {
        if (action.filter !== filter) {
            return state
        }
        switch (action.type) {
            case ADD_TODO.REQUEST:
            case TOGGLE_TODO.REQUEST:
            case FETCH_TODOS.REQUEST:
                return true
            case ADD_TODO.SUCCESS:
            case ADD_TODO.FAILURE:
            case TOGGLE_TODO.SUCCESS:
            case TOGGLE_TODO.FAILURE:
            case FETCH_TODOS.SUCCESS:
            case FETCH_TODOS.FAILURE:
                return false
            default:
                return state
        }
    }

    const errorMessage = (state = null, action) => {
        if (action.filter !== filter) {
            return state
        }

        switch (action.type) {
            case ADD_TODO.FAILURE:
            case TOGGLE_TODO.FAILURE:
            case FETCH_TODOS.FAILURE:
                return action.message
            case FETCH_TODOS.REQUEST:
            case FETCH_TODOS.SUCCESS:
            case ADD_TODO.REQUEST:
            case ADD_TODO.SUCCESS:
            case TOGGLE_TODO.REQUEST:
            case TOGGLE_TODO.SUCCESS:
                return null
            default:
                return state
        }
    }

    return combineReducers({
        ids,
        isFetching,
        errorMessage
    })
}

export default createList

export const getIds = state => state.ids
export const getIsFetching = state => state.isFetching
export const getErrorMessage = state => state.errorMessage
