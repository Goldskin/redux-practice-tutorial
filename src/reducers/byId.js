import { FETCH_TODOS, ADD_TODO, TOGGLE_TODO } from "../const";

const byId = (state = {}, action) => {
    switch (action.type) {
        case FETCH_TODOS.SUCCESS:
            const nextState = { ...state }
            action.response.forEach(todo => {
                nextState[todo.id] = todo
            })
            return nextState
        case ADD_TODO.SUCCESS:
            return {
                ...state,
                [action.response.id]: action.response
            }
        case TOGGLE_TODO.SUCCESS:
            return {
                ...state,
                [action.id]: action
            }
        default:
            return state
    }
}

export default byId

export const getTodo = (state, id) => state[id]