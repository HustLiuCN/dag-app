import { Reducer } from 'redux'
import { Editor } from 'simple-dag-editor'
import { ADD_SHAPE, DEL_SHAPE, ADD_CATEGORY, DEL_CATEGORY } from '../actions'
import defaultShapes from 'src/lib/defaultShapes'

import { List } from '../lib/utils'

export const Shapes = {
  shapeList: [
    ...defaultShapes,
  ],
  categoryList: [
    '矩形',
  ],
}

export const shapesReducer: Reducer<Shapes.IState> = (state = Shapes, action) => {
  switch(action.type) {
    case ADD_SHAPE:
      return {
        ...state,
        shapeList: addShape(state.shapeList, action.shape),
      }
    case DEL_SHAPE:
      return {
        ...state,
        shapeList: delShape(state.shapeList, action.name),
      }
    case ADD_CATEGORY:
      return {
        ...state,
        categoryList: addCategory(state.categoryList, action.name),
      }
    case DEL_CATEGORY:
      return {
        ...state,
        categoryList: delCategory(state.categoryList, action.name),
      }
    default:
      return state
  }
}

export declare namespace Shapes {
  export interface IState {
    categoryList: string[],
    shapeList: IShape[],
  }
  export interface IShape extends Editor.IShape {
    category?: string,
    graph?: 'rect',
    [custom_key: string]: any,
  }
}

// handlers
function addShape(list: Shapes.IShape[], shape: Shapes.IShape): Shapes.IShape[] {
  // TODO
  return List.insert(list, shape)
}

function delShape(list: Shapes.IShape[], name: string): Shapes.IShape[] {
  return List.remove(list, list.findIndex(li => li.shape === name))
}

function addCategory(list: string[], category: string): string[] {
  // TODO
  return list.indexOf(category) > -1 ? list : [ ...list, category ]
}

function delCategory(list: string[], category: string): string[] {
  return List.remove(list, list.indexOf(category))
}
