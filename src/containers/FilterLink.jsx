import React from 'react'
import { VisibilityFilters } from '../actions'
import { NavLink } from 'react-router-dom'

// const mapStateToProps = (state, ownProps) => ({
//     active: ownProps.filter === state.visibilityFilter
// })

// const mapDispatchToProps = (dispatch, ownProps) => ({
//     onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
// })

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Link)

const FilterLink = ({
    filter,
    children
}) => (
    <NavLink
        exact
        to={filter === VisibilityFilters.SHOW_ALL ? '' : `/${filter}`}
        activeStyle={{
            fontWeight: 'bold',
            color: 'red'
        }}>
        {children}
    </NavLink>
)

export default FilterLink