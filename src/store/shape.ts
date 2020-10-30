import { Reducer } from 'redux'
import { Editor } from 'simple-dag-editor'
import { ADD_SHAPE, DEL_SHAPE, ADD_CATEGORY, DEL_CATEGORY } from '../actions'
import defaultShapes from 'src/lib/defaultShapes'

import { removeListByIndex, addList } from '../lib/utils'

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
    name: string,
    category?: string,
    graph?: 'rect' | 'ellipse' | 'circle' | 'diamond',
  }
}

// handlers
function addShape(list: Shapes.IShape[], shape: Shapes.IShape): Shapes.IShape[] {
  return list.find(li => li.shape === shape.name) ? list : addList(list, shape)
}

function delShape(list: Shapes.IShape[], name: string): Shapes.IShape[] {
  let i = list.findIndex(li => li.shape === name)
  if (i > -1) {
    return removeListByIndex(list, i)
  }
  return list
}

function addCategory(list: string[], category: string): string[] {
  return list.indexOf(category) > -1 ? list : [ ...list, category ]
}

function delCategory(list: string[], category: string): string[] {
  let i = list.indexOf(category)
  if (i > -1) {
    return removeListByIndex(list, i)
  }
  return list
}
