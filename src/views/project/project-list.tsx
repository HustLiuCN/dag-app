import React from 'react'
import { Projects } from 'src/store/project'
import Item from './project-item'

const ProjectList = ({
  list,
}: {
  list: Projects.IProject[],
}) => {
  return (
    <div className="project-list">
      {
        list.map(p => (
          <Item pro={ p } key={ p.id } />
        ))
      }
    </div>
  )
}



export default ProjectList
