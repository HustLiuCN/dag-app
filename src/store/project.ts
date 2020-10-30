import { Reducer } from "redux"
import { ADD_PROJECT, DEL_PROJECT } from "src/actions"
import { removeListByIndex } from "src/lib/utils"

export const Projects = {
  projectList: [
    { id: '1', name: '演示项目1', tags: ['demo', 'dag', '前端'] },
    { id: '2', name: '演示项目2', tags: ['demo', '前端'] },
    { id: '3', name: '演示项目3', tags: ['demo', 'dag'] },
  ],
  tagList: ['demo', 'dag', '前端'],
}

export const projectsReducer: Reducer<Projects.IState> = (state = Projects, action) => {
  switch(action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projectList: [
          ...state.projectList,
          action.project,
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
  }
}

// handlers
function delProject(list: Projects.IProject[], id: string) {
  const i = list.findIndex(li => li.id === id)
  if (i > -1) {
    return removeListByIndex(list, i)
  }
  return list
}
