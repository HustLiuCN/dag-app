import React from 'react'
import { Projects } from 'src/store/project'
import Item from './project-item'

const ProjectList = ({
  list,
  current,
}: {
  list: Projects.IProject[],
  current?: string,
}) => {
  return (
    <div className="project-list">
      {
        list.map(p => (
          <Item pro={ p } key={ p.id } selected={ current === p.id } />
        ))
      }
    </div>
  )
}



export default ProjectList
