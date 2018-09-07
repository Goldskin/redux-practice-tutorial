import { connect } from 'react-redux'
import { toggleTodo, VisibilityFilters } from '../actions'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router-dom'
import { getVisibleTodos } from '../reducers'

const mapStateToProps = (state, { match }) => ({
    todos: getVisibleTodos(state, match.params.filter || VisibilityFilters.SHOW_ALL )
})

export default withRouter(connect(
    mapStateToProps,
    { toggleTodo: toggleTodo }
)(TodoList))