import { Dag } from "src/store/dag"
import { ADD_NODE, DEL_NODE, SET_DAG, UPDATE_NODE, CLEAR_DAG, ADD_EDGE, DEL_EDGE, TOGGLE_DAG_STATUS, SAVE_DAG_PROJECT } from "./namespace"

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

export const addEdge = (edge: Dag.IEdge) => {
  return {
    type: ADD_EDGE,
    edge,
  }
}

export const delEdge = (id: string) => {
  return {
    type: DEL_EDGE,
    id,
  }
}

// set dag with project[dag]
export const setDag = (dag: Dag.IDag, pid: string) => {
  return {
    type: SET_DAG,
    dag,
    pid,    // project_id
  }
}

// save dag as a project
export const saveDagAsProject = (id: string) => {
  return {
    type: SAVE_DAG_PROJECT,
    id,
  }
}

export const clearDag = () => {
  return {
    type: CLEAR_DAG,
  }
}

export const toggle = (status: boolean) => {
  return {
    type: TOGGLE_DAG_STATUS,
    status,
  }
}
