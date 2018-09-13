import * as api from '../api'
import { getIsFetching } from '../reducers'
import { FETCH_TODOS, ADD_TODO, TOGGLE_TODO } from '../const';
import { normalize } from "normalizr";
import * as schema from './schema'

export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve()
    }

    dispatch({
        type: FETCH_TODOS.REQUEST,
        filter
    })

    return api.fetchTodos(filter).then(
        response => {
            dispatch({
                type: FETCH_TODOS.SUCCESS,
                filter,
                response: normalize(response, schema.arrayOfTodos)
            })
        },
        error => {
            dispatch({
                type: FETCH_TODOS.FAILURE,
                filter,
                message: error.message || 'Something went wrong'
            })
        }
    )
}


export const addTodo = text => (dispatch, getState) => {
    dispatch({
        type: ADD_TODO.REQUEST
    })
    return api.addTodo(text).then(
        response => {
            dispatch({
                type: ADD_TODO.SUCCESS,
                response: normalize(response, schema.todo)
            })
        },
        error => {
            dispatch({
                type: ADD_TODO.FAILURE,
                message: error.message || 'Something went wrong'
            })
        }
    )
}


export const toggleTodo = id => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_TODO.REQUEST
    })
    return api.toggleTodo(id).then(
        response => {
            dispatch({
                type: TOGGLE_TODO.SUCCESS,
                response: normalize(response, schema.todo)
            })
        },
        error => {
            dispatch({
                type: TOGGLE_TODO.SUCCESS,
                message: error.message || 'Something went wrong'
            })
        }
    )
}
