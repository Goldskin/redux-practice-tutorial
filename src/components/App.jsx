import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { VisibilityFilters } from '../actions'

const App = ({ match }) => (
    <div>
        <AddTodo />
        <VisibleTodoList
            filter={match.params.filter || VisibilityFilters.SHOW_ALL}
        />
        <Footer />
    </div>
)

export default App