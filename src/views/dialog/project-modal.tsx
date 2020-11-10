import { Modal, Row, Col, Input, message } from 'antd'
import React, { ChangeEvent, useState } from 'react'
import { Dispatch } from 'redux'
import { addProject } from 'src/actions/project'
import { Projects } from 'src/store/project'
import { connect } from 'react-redux'
import { timeStamp16 } from 'src/lib/utils'
import { IState } from 'src/store'

const ProjectModal = ({
  visible,
  projectList,
  args,
  close,
  addProject,
}: IProps) => {
  const [name, setName] = useState('')
  const [tags, setTags] = useState('')

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
    addProject({
      id: timeStamp16(),
      name,
      tags: tags.split(/[,，]/).filter(t => t.trim().length),
      dag: args.dag,
    })
    message.success('保存项目成功')
    close()
  }

  return (
    <Modal
      visible={ visible }
      title={ `${args.saveType === 'save-as' ? '另' : '保'}存为项目` }
      className="new-project-dialog"
      onOk={ submit }
      onCancel={ close }>
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
  args: any,
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
