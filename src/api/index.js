import { VisibilityFilters } from "../actions";
import { v4 } from "node-uuid";

const fakeDatabase = {
    todos: [{
        id: v4(),
        text: 'todo 1',
        completed: true
    }, {
        id: v4(),
        text: 'todo 2',
        completed: true
    }, {
        id: v4(),
        text: 'todo 3',
        completed: false
    }]
}

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms))

export const fetchTodos = (filter) => {
    return delay(1500).then(() => {
        switch (filter) {
            case VisibilityFilters.SHOW_ALL:
                return fakeDatabase.todos
            case VisibilityFilters.SHOW_COMPLETED:
                return fakeDatabase.todos.filter(t => t.completed)
            case VisibilityFilters.SHOW_ACTIVE:
                return fakeDatabase.todos.filter(t => !t.completed)
            default:
                throw new Error(`unknow filter: ${filter}`)
        }
    })
}