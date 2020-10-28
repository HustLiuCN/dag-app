import { Input } from 'antd'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { addProject } from 'src/actions/project'
import { IState } from 'src/store'
import { Projects } from 'src/store/project'
import ProjectEditor from './new-project'

const ProjectComponent = (props: ProjectComponent.IProps) => {
  const [showPro, setExtraPro] = useState(false)
  const [showFilter, setExtraFilter] = useState(false)

  const toggleShowPro = () => {
    setExtraPro(!showPro)
  }

  const newProject = (project: Projects.IProject) => {
    props.addProject(project)
    setExtraPro(false)
  }

  return (
    <div className="project-box">
      <div className="search-box">
        <Input
          placeholder="查询项目"
          allowClear
          addonAfter={
            <i className={ `filter-btn iconfont icon-filter ${showFilter ? 'active' : ''}` }></i>
          }
          />
        <i
          className={ `add-btn iconfont icon-tianjia ${showPro ? 'active' : ''}` }
          onClick={ toggleShowPro }></i>
      </div>

      <div className={ `extra-box` }>
        {showPro && <ProjectEditor submit={ newProject } />}
      </div>
    </div>
  )
}

const mapState = (state: IState) => {
  const { project } = state
  return {
    ...project,
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    addProject: (project: Projects.IProject) => {
      return dispatch(addProject(project))
    },
  }
}

export declare namespace ProjectComponent {
  export interface IProps extends Projects.IState {
    addProject(p: Projects.IProject): void,
  }
}

export default connect(
  mapState,
  mapDispatch,
)(ProjectComponent)
