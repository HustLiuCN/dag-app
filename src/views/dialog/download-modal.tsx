import { Input, Modal, Radio, Row, Col } from 'antd'
import React, { useState } from 'react'

const DownloadModalContent = ({
  fileName,
  fileType,
  onChange,
}: {
  fileName: string,
  fileType: string,
  onChange(val: string, t: string): void,
}) => {
  const [name, setName] = useState(fileName)
  const [type, setType] = useState(fileType)

  const change = (val: string, t: string) => {
    t === 'name' ? setName(val) : setType(val)
    onChange(val, t)
  }

  return (
    <Row className="form-inline-row" gutter={ 16 }>
      <Col>
        <Input value={ name } onChange={ e => change(e.target.value.trim(), 'name') } />
      </Col>
      <Col>
        <Radio.Group value={ type } onChange={ e => change(e.target.value, 'type') }>
          <Radio value="jpeg">JPEG</Radio>
          <Radio value="png">PNG</Radio>
        </Radio.Group>
      </Col>
    </Row>
  )
}

const DownloadModal = ({
  title = '未命名',
  callback,
}: {
  title?: string,
  callback(n: string, t: string): void,
}) => {
  let name = title
  let type = 'jpeg'

  const change = (val: string, t: string) => {
    if (t === 'name') {
      name = val
    } else {
      type = val
    }
  }

  Modal.confirm({
    title: '保存到本地',
    icon: null,
    content: <DownloadModalContent fileName={ name } fileType={ type } onChange={ change } />,
    okText: '保存',
    cancelText: '取消',
    onOk: () => {
      return callback(name, type)
    },
    // maskClosable: true,
  })
}

export default DownloadModal
