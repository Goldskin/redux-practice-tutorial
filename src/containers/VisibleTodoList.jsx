import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router-dom'
import { getVisibleTodos } from '../reducers'
import React, { Component } from 'react'

class VisibleTodoList extends Component {
    componentDidMount () {
        console.log(this.props.filter);
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
        const {toggleTodo, ...rest} = this.props
        return (
            <TodoList 
                {...rest}
                onTodoClick={toggleTodo}
            />
        )
    }
}

const mapStateToProps = (state, { match }) => {
    const filter = match.params.filter || actions.VisibilityFilters.SHOW_ALL
    return {
        todos: getVisibleTodos(state, filter),
        filter
    }
}

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList))

export default VisibleTodoList