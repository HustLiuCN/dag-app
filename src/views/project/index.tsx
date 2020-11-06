import { Input } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { addProject } from 'src/actions/project'
import { IState } from 'src/store'
import { Projects } from 'src/store/project'
import ProjectEditor from './new-project'
import ProjectList from './project-list'
import TagsFilter from './tags-filter'

class ProjectComponent extends React.Component<ProjectComponent.IProps> {
  state = {
    showPro: false,
    showFilter: false,
    filter: '',
    filterTags: [],
    filterList: this.props.projectList,
  }

  // create new project
  toggleShowPro = () => {
    this.setState({
      showPro: !this.state.showPro,
      showFilter: false,
    })
  }
  submitNewProject = (project: Projects.IProject) => {
    this.props.addProject(project)
    this.setState({
      showPro: false,
    })
  }
  // filter project
  toggleFilter = () => {
    this.setState({
      showFilter: !this.state.showFilter,
      filterTags: [],

      showPro: false,
    })
  }
  tagsFilter = (tags: string[]) => {
  //   const list = this.props.projectList.slice()
    this.setState({
      filterTags: tags,
    })
  }
  componentDidUpdate(prevProps: ProjectComponent.IProps, prevState: any) {
    console.log(prevState)
  }

  render() {
    const { showPro, showFilter, filterTags } = this.state
    return (
      <div className="project-box">
        <div className="search-box">
          <Input
            size="middle"
            placeholder="查询项目"
            allowClear
            addonAfter={
              <i
                className={
                  `filter-btn iconfont icon-filter ${(showFilter || filterTags.length > 0) ? 'active' : ''}`
                }
                onClick={ this.toggleFilter }></i>
            }
            />
          <i
            className={ `add-btn iconfont icon-tianjia ${showPro ? 'active' : ''}` }
            onClick={ this.toggleShowPro }></i>
        </div>

        <div className={ `extra-box` }>
          {showPro && <ProjectEditor submit={ this.submitNewProject } />}
          {showFilter && <TagsFilter tags={ this.props.tagList } change={ this.tagsFilter } />}
        </div>

        <div className="project-list-box">
          {/* TODO filterList */}
          <ProjectList list={ this.props.projectList } />
        </div>
      </div>
    )
  }
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
