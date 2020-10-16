import { createStore } from 'redux'
import { state, reducer } from './state'

const store = createStore(reducer, state)
export default store