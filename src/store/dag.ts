import { Reducer } from "redux"
import { Editor } from "simple-dag-editor"
import { ADD_EDGE, ADD_NODE, CLEAR_DAG, DEL_EDGE, DEL_NODE, SET_DAG, UPDATE_NODE } from "src/actions"
import { List } from "src/lib/utils"
import { Shapes } from "./shape"

export const Dag = {
  // config: {},
  changed: false,
  project: '',
  nodes: [],
  edges: [],
}

export const dagReducer: Reducer<Dag.IState> = (state = Dag, action) => {
  switch(action.type) {
    // node
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
    // edge
    case ADD_EDGE:
      return {
        ...state,
        edges: addEdge(state.edges, action.edge),
      }
    case DEL_EDGE:
      return {
        ...state,
        edges: delEdge(state.edges, action.id),
      }
    case SET_DAG:
      return {
        ...state,
        project: action.pid,
        ...copyDag(action.dag),
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

// handlers
function delNode(nodes: Dag.INode[], id: string) {
  return List.remove(nodes, nodes.findIndex(n => n.id === id))
}
function updateNode(nodes: Dag.INode[], node: Dag.INode) {
  return List.updateInsert(nodes, node, nodes.findIndex(n => n.id === node.id))
}
function addEdge(edges: Dag.IEdge[], edge: Dag.IEdge) {
  return List.insert(edges, edge)
}
function delEdge(edges: Dag.IEdge[], edge: Dag.IEdge) {
  return List.remove(edges, edges.findIndex(e => e.id === edge.id))
}
function copyDag(dag: Dag.IDag) {
  return {
    nodes: dag.nodes.slice(),
    edges: dag.edges.slice(),
  }
}

// interface
export declare namespace Dag {
  export interface IState {
    project?: string,
    nodes: INode[],
    edges: IEdge[],
    changed: boolean,
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
