import { VisibilityFilters } from "../const";
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
    return delay(300).then(() => {
        if (Math.random() > 0.8) {
            throw new Error('KABOOM')
        }
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


export const addTodo = (text) => 
    delay(300).then(() => {
        const todo = {
            id: v4(),
            text,
            completed: false
        }
        fakeDatabase.todos.push(todo)
        return todo
    })

export const toggleTodo = (id) =>
    delay(300).then(() => {
        const todo = fakeDatabase.todos.find(t => t.id === id)
        todo.completed = !todo.completed
        return todo
    })

export const deleteTodo = (id) =>
    delay(300).then(() => {
        const index = fakeDatabase.todos.findIndex(t => t.id === id);
        fakeDatabase.todos.splice(index, 1)
        return fakeDatabase.todos

    })