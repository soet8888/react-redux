import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import allReducers from './reducers/reducers'
export default createStore(allReducers, applyMiddleware(thunk));