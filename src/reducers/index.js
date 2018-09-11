import { VisibilityFilters } from '../const'
import { combineReducers } from 'redux';
import byId, * as fromByid from './byId';
import createList, * as fromList from './createList';



const listByFilter = combineReducers({
    [VisibilityFilters.SHOW_ALL]: createList(VisibilityFilters.SHOW_ALL),
    [VisibilityFilters.SHOW_ACTIVE]: createList(VisibilityFilters.SHOW_ACTIVE),
    [VisibilityFilters.SHOW_COMPLETED]: createList(VisibilityFilters.SHOW_COMPLETED)
})

const todos = combineReducers({
    byId,
    listByFilter
})

export default todos

export const getVisibleTodos = (state, filter) => {
    const ids = fromList.getIds(state.listByFilter[filter])
    return ids.map(id => fromByid.getTodo(state.byId, id))
}

export const getIsFetching = (state, filter) =>
    fromList.getIsFetching(state.listByFilter[filter])