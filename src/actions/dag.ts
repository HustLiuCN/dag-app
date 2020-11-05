
import { Dag } from "src/store/dag"
import { ADD_NODE, DEL_NODE, UPDATE_NODE } from "./namespace"

export const addNode = (node: Dag.INode) => {
  return {
    type: ADD_NODE,
    node,
  }
}

export const delNode = (id: string) => {
  return {
    type: DEL_NODE,
    id,
  }
}

export const updateNode = (node: Dag.INode) => {
  return {
    type: UPDATE_NODE,
    node,
  }
}
