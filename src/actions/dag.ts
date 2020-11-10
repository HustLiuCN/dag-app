
import { Dag } from "src/store/dag"
import { ADD_NODE, DEL_NODE, SET_DAG, UPDATE_NODE, CLEAR_DAG } from "./namespace"

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

export const setDag = (dag: Dag.IDag, pid: string) => {
  return {
    type: SET_DAG,
    dag,
    pid,
  }
}

export const clearDag = () => {
  return {
    type: CLEAR_DAG,
  }
}
