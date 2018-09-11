import { connect } from 'react-redux'
import * as actions from '../actions'
import { VisibilityFilters } from '../const'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router-dom'
import { getVisibleTodos, getIsFetching } from '../reducers'
import React, { Component } from 'react'
import Loading from '../components/Loading';


class VisibleTodoList extends Component {
    componentDidMount () {
        this.fetchData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData()
        }
    }

    fetchData () {
        const { filter, fetchTodos } = this.props
        fetchTodos(filter)
    }

    render () {
        const { toggleTodo, isFetching, todos } = this.props
        if (isFetching && !todos.length) {
            return <Loading />
        }
        return (
            <TodoList 
                todos={todos}
                onTodoClick={toggleTodo}
            />
        )
    }
}

const mapStateToProps = (state, { match }) => {
    const filter = match.params.filter || VisibilityFilters.SHOW_ALL
    
    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    }
}

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList))

export default VisibleTodoList