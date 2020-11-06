import { Reducer } from "redux"
import { Editor } from "simple-dag-editor"
import { ADD_NODE, DEL_NODE, UPDATE_NODE } from "src/actions"
import { Shapes } from "./shape"

export const Dag = {
  info: {},
  config: {},
  nodes: {},
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

function delNode(nodes: Dag.INodes, id: string) {
  const tmp = { ...nodes }
  delete tmp[id]
  return tmp
}

function updateNode(nodes: Dag.INodes, node: Dag.INode) {
  return {
    ...nodes,
    [node.id]: node,
  }
}

export declare namespace Dag {
  export interface IState {
    nodes: INodes,
    edges: IEdge[],
  }
  export interface IDag {
    nodes: INodes,
    edges: IEdge[],
  }
  export interface INodes {
    [id: string]: Dag.INode,
  }
  export interface IEdge extends Editor.IEdge {
    id: string,
  }
  export interface INode extends Editor.INode, Shapes.IShape {
    id: string,
  }
}
