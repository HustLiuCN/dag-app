import React from 'react'
import { Row, Col, Form, Input } from 'antd'

export function SizeControll({
  width,
  height,
  readonly,
}: {
  width: string,
  height: string,
  readonly?: boolean,
}) {
  return (
    <Row gutter={ 10 }>
      <Col span={ 10 }>
        <Form.Item name={ width } noStyle>
          <Input placeholder="宽" suffix="px" readOnly={ readonly } />
        </Form.Item>
      </Col>
      <Col span={ 4 }>
        <span className="join-span"><i className="iconfont icon-cross"></i></span>
      </Col>
      <Col span={ 10 }>
        <Form.Item name={ height } noStyle>
          <Input placeholder="高" suffix="px" readOnly={ readonly } />
        </Form.Item>
      </Col>
    </Row>
  )
}
