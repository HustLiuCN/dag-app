import { Projects } from "src/store/project"
import { ADD_PROJECT, DEL_PROJECT } from "./namespace"

export const addProject = (project: Projects.IProject) => {
  // TODO add tags
  return {
    type: ADD_PROJECT,
    project,
  }
}

export const delProject = (id: string) => {
  return {
    type: DEL_PROJECT,
    id,
  }
}
