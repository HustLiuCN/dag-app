import { Modal, Row, Col, Input, message } from 'antd'
import React, { ChangeEvent, useState } from 'react'
import { Dispatch } from 'redux'
import { addProject } from 'src/actions/project'
import { Projects } from 'src/store/project'
import { connect } from 'react-redux'
import { timeStamp16 } from 'src/lib/utils'
import { IState } from 'src/store'
import { Dag } from 'src/store/dag'

const ProjectModal = ({
  visible,
  projectList,
  args,
  close,
  addProject,
}: IProps) => {
  const { saveType: type } = args
  const [name, setName] = useState('')
  const [tags, setTags] = useState('')

  const title = type === 'save-as' ? '另存' : ( type === 'save-new' ? '保存' : '新建' )

  const change = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const val = e.target.value.trim()
    if (type === 'name') {
      setName(val)
    } else {
      setTags(val)
    }
  }

  const submit = () => {
    if (!name.length) {
      message.error('项目名称不能为空')
      return
    }
    if (projectList.find(p => p.name === name)) {
      message.error('已存在同名项目')
      return
    }
    const id = timeStamp16()
    addProject({
      id,
      name,
      tags: tags.split(/[,，]/).filter(t => t.trim().length),
      dag: args.dag,
    })
    message.success(`${title}项目成功`)
    args.callback && args.callback(id)
    close()
  }

  return (
    <Modal
      visible={ visible }
      title={ `${title}项目` }
      className="new-project-dialog"
      onOk={ submit }
      onCancel={ close }
      okText="确定"
      cancelText="取消">
      <Row align="middle" gutter={ 4 }>
        <Col span={ 5 }>项目名称:</Col>
        <Col span={ 19 }>
          <Input value={ name } onChange={ e => change(e, 'name') }></Input>
        </Col>
      </Row>
      <Row align="middle" gutter={ 4 }>
        <Col span={ 5 }>项目标签:</Col>
        <Col span={ 19 }>
        <Input value={ tags } onChange={ e => change(e, 'tags') } placeholder="逗号分隔"></Input>
        </Col>
      </Row>
    </Modal>
  )
}

interface IProps extends Projects.IState {
  visible: boolean,
  close(): void,
  addProject(p: Projects.IProject): void,
  args: {
    saveType: string,
    dag: Dag.IDag,
    callback?(id: string): void,
  },
}

const mapState = (state: IState) => {
  const { project, dialog } = state
  return {
    ...project,
    // ...dialog,
    args: dialog.args,
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    addProject: (project: Projects.IProject) => {
      return dispatch(addProject(project))
    },
  }
}

export default connect(
  mapState,
  mapDispatch,
)(ProjectModal)
