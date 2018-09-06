import { v4 } from "node-uuid";
export const addTodo = text => ({
    type: 'ADD_TODO',
    id: v4(),
    text
})

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
})

export const VisibilityFilters = {
    SHOW_ALL: 'all',
    SHOW_COMPLETED: 'completed',
    SHOW_ACTIVE: 'active'
}