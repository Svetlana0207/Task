import { createStore, applyMiddleware } from 'redux'
import {companiesReducer} from './companiesReducer'
import thunk from 'redux-thunk'

export const store = createStore(companiesReducer, applyMiddleware(thunk))