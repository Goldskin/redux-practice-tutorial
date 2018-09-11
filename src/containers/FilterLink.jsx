import React from 'react'
import { VisibilityFilters } from '../actions'
import { NavLink } from 'react-router-dom'

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