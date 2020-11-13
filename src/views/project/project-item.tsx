import React, { useState } from 'react'
import { Tag, Modal } from 'antd'
import { Projects } from 'src/store/project'
import { Dispatch } from 'redux'
import { delProject } from 'src/actions/project'
import { connect } from 'react-redux'
import { Dag } from 'src/store/dag'
import { setDag } from 'src/actions/dag'

const Item = (props: {
  selected: boolean,
  pro: Projects.IProject,
  delProject(id: string): void,
  chooseProject(dag: Dag.IDag, id: string): void,
}) => {
  const { pro } = props

  // edit status
  // const [edit, setEdit] = useState(false)

  const [name] = useState(pro.name)
  const [tags] = useState(pro.tags)

  // view project
  const view = () => {
    let dag = pro.dag ?? { nodes: [], edges: [] }
    props.chooseProject(dag, pro.id)
  }

  // del project
  const del = (e: React.MouseEvent) => {
    e.stopPropagation()

    Modal.confirm({
      title: `确认删除项目 ${pro.name} ?`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        props.delProject(pro.id)
      },
    })
  }

  return (
    <div className={ `project-item ${props.selected ? 'active' : ''}` } onClick={ view }>
      <div className="project-name">{ name }</div>
      <div className="tag-list">
        {
          tags && tags.map((t, i) => (
            <Tag className="project-tag" key={ t + i }>{ t }</Tag>
          ))
        }
      </div>
      <div className="handler-box">
        <i className="edit-btn iconfont icon-editor"></i>
        <i className="del-btn iconfont icon-delete1" onClick={ del }></i>
      </div>
    </div>
  )
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    delProject: (id: string) => {
      return dispatch(delProject(id))
    },
    chooseProject: (dag: Dag.IDag, id: string) => {
      return dispatch(setDag(dag, id))
    },
  }
}

export default connect(
  null,
  mapDispatch,
)(Item)
