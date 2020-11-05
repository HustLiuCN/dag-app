import React, { useState } from 'react'
import { Col, Input, Row, Select } from 'antd'
import { Projects } from 'src/store/project'
import { timeStamp16 } from 'src/lib/utils'

const ProjectEditor = ({
  submit,
}: {
  submit(p: Projects.IProject): void,
}) => {
  const [name, setName] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const createProject = () => {
    const project = {
      id: timeStamp16(),
      name,
      tags,
    }
    submit(project)
  }

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim())
  }
  const changeTags = (val: string[]) => {
    setTags(val)
  }

  return (
    <div className="new-project-box">
      <div className="left-box">
        <Row align="middle" className="row">
          <Col className="label" span={ 4 }>项目名称:</Col>
          <Col span={ 20 }>
            <Input value={ name } onChange={ changeName } bordered={ false } allowClear />
          </Col>
        </Row>
        <div className="divider-line"></div>
        <Row align="middle" className="row">
          <Col className="label" span={ 4 }>项目标签:</Col>
          <Col span={ 20 }>
            <Select
              mode="tags"
              value={ tags }
              onChange={ changeTags }
              style={{ width: '100%' }}
              bordered={ false }
              tokenSeparators={[',', ' ', '，']}
              placeholder="逗号或空格添加"
              >
            </Select>
          </Col>
        </Row>
      </div>

      <i className="submit-btn iconfont icon-check1" onClick={ createProject }></i>
    </div>
  )
}

export default ProjectEditor
