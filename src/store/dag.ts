import { Reducer } from "redux"
import { Editor } from "simple-dag-editor"
import { ADD_NODE, CLEAR_DAG, DEL_NODE, SET_DAG, UPDATE_NODE } from "src/actions"
import { removeListByIndex } from "src/lib/utils"
import { Shapes } from "./shape"

export const Dag = {
  config: {},
  project: '',
  nodes: [],
  edges: [],
}

export const dagReducer: Reducer<Dag.IState> = (state = Dag, action) => {
  switch(action.type) {
    case ADD_NODE:
    case UPDATE_NODE:
      return {
        ...state,
        nodes: updateNode(state.nodes, action.node),
      }
    case DEL_NODE:
      return {
        ...state,
        nodes: delNode(state.nodes, action.id),
      }
    case SET_DAG:
      return {
        ...state,
        project: action.pid,
        ...action.dag,
      }
    case CLEAR_DAG:
      return {
        ...state,
        project: '',
        nodes: [],
        edges: [],
      }
    default:
      return state
  }
}

// function addNode(nodes: Dag.INodes, node: Dag.INode) {
//   return {
//     ...nodes,
//     [node.id]: node,
//   }
// }

function delNode(nodes: Dag.INode[], id: string) {
  const i = nodes.findIndex(n => n.id === id)
  return i > -1 ? removeListByIndex(nodes, i) : nodes
}

function updateNode(nodes: Dag.INode[], node: Dag.INode) {
  const i = nodes.findIndex(n => n.id === node.id)
  if (i < 0) {
    return nodes
  }
  return [
    ...nodes.slice(0, i),
    node,
    ...nodes.slice(i + 1),
  ]
}

export declare namespace Dag {
  export interface IState {
    project?: string,
    nodes: INode[],
    edges: IEdge[],
  }
  export interface IDag {
    nodes: INode[],
    edges: IEdge[],
  }
  export interface IEdge extends Editor.IEdge {
    id: string,
  }
  export interface INode extends Editor.INode, Shapes.IShape {
    id: string,
  }
}
