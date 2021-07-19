import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import book from './book'

const createHistory = require("history").createBrowserHistory
export const history = createHistory()

export const rootReducer = combineReducers({
  router: connectRouter(history),
  book,
})
