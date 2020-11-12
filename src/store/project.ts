import { Reducer } from "redux"
import { ADD_PROJECT, DEL_PROJECT } from "src/actions"
import { List } from "src/lib/utils"
import { Dag } from "./dag"

export const Projects = {
  projectList: [],
  tagList: ['demo'],
}

export const projectsReducer: Reducer<Projects.IState> = (state = Projects, action) => {
  switch(action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projectList: [
          ...state.projectList,
          addProject(action.project),
        ],
      }
    case DEL_PROJECT:
      return {
        ...state,
        projectList: delProject(state.projectList, action.id),
      }
    default:
      return state
  }
}

export declare namespace Projects {
  export interface IState {
    projectList: IProject[],
    tagList: string[],
  }
  export interface IProject {
    id: string,
    name: string,
    tags?: string[],
    dag?: Dag.IDag,
  }
}

// handlers
function addProject(pro: Projects.IProject): Projects.IProject {
  const tmp = {
    ...pro,
    dag: {
      nodes: pro.dag?.nodes.slice() ?? [],
      edges: pro.dag?.edges.slice() ?? [],
    },
  }
  return tmp
}
function delProject(list: Projects.IProject[], id: string) {
  return List.remove(list, list.findIndex(li => li.id === id))
}
