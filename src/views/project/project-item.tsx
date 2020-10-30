import React, { useState } from 'react'
import { Tag, Modal } from 'antd'
import { Projects } from 'src/store/project'
import { Dispatch } from 'redux'
import { delProject } from 'src/actions/project'
import { connect } from 'react-redux'

const Item = (props: {
  pro: Projects.IProject,
  delProject(id: string): void,
}) => {
  const { pro } = props

  // edit status
  // const [edit, setEdit] = useState(false)

  const [name] = useState(pro.name)
  const [tags] = useState(pro.tags)

  // del project
  const del = () => {
    Modal.confirm({
      title: '确认删除项目？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        props.delProject(pro.id)
      },
    })
  }

  return (
    <div className="project-item">
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
  }
}

export default connect(
  null,
  mapDispatch,
)(Item)
