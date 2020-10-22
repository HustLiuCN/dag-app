import { ADD_SHAPE, DEL_SHAPE, ADD_CATEGORY, DEL_CATEGORY } from './namespace'
import { Shapes } from '../store/shape'

export const addShape = (shape: Shapes.IShape) => {
  return {
    type: ADD_SHAPE,
    shape,
  }
}

export const delShape = (name: string) => {
  return {
    type: DEL_SHAPE,
    name,
  }
}

export const addCategory = (name: string) => {
  return {
    type: ADD_CATEGORY,
    name,
  }
}

export const delCategory = (name: string) => {
  return {
    type: DEL_CATEGORY,
    name,
  }
}
