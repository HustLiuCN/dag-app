import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Reducer, createStore, combineReducers, applyMiddleware } from 'redux'
import { Menu, menuReducer } from './menu'
import { Shapes, shapesReducer } from './shape'
import { DialogStatus, Dialog, dialogReducer } from './dialog'
import { Projects, projectsReducer } from './project'

// initial state
export const initialState: IState = {
  menu: Menu,
  shape: Shapes,
  dialog: DialogStatus,
  project: Projects,
}
// root reducer
const reducer: Reducer<IState> = combineReducers({
  menu: menuReducer,
  shape: shapesReducer,
  dialog: dialogReducer,
  project: projectsReducer,
})
// middleware
const loggerMiddleware = createLogger()
// root store
export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
)
// interafce
export interface IState {
  menu: Menu.IState,
  shape: Shapes.IState,
  dialog: Dialog.IState,
  project: Projects.IState,
}
