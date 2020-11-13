import { Input } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { openDialog } from 'src/actions'
import { IState } from 'src/store'
import { Projects } from 'src/store/project'
import ProjectList from './project-list'
import TagsFilter from './tags-filter'

class ProjectComponent extends React.Component<ProjectComponent.IProps> {
  state = {
    showFilter: false,
    filter: '',
    filterTags: [],
    filterList: this.props.projectList,
  }

  // create new project
  toggleShowPro = () => {
    this.props.newProject({
      saveType: 'create-new',
      dag: {
        nodes: [],
        edges: [],
      },
    })
  }
  // filter project
  toggleFilter = () => {
    this.setState({
      showFilter: !this.state.showFilter,
      filterTags: [],
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
    const { showFilter, filterTags } = this.state
    const { projectList, tagList, currentProject } = this.props
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
            className={ `add-btn iconfont icon-tianjia` }
            onClick={ this.toggleShowPro }></i>
        </div>

        <div className={ `extra-box` }>
          {showFilter && <TagsFilter tags={ tagList } change={ this.tagsFilter } />}
        </div>

        <div className="project-list-box">
          {/* TODO filterList */}
          <ProjectList list={ projectList } current={ currentProject } />
        </div>
      </div>
    )
  }
}

const mapState = (state: IState) => {
  const { project } = state
  return {
    ...project,
    currentProject: state.dag.project,
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    newProject: (args: any) => dispatch(openDialog('project', args)),
  }
}

export declare namespace ProjectComponent {
  export interface IProps extends Projects.IState {
    currentProject?: string,
    newProject(args: any): void,
  }
}

export default connect(
  mapState,
  mapDispatch,
)(ProjectComponent)
