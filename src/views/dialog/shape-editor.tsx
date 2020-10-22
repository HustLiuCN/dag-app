import * as React from 'react'
import { Button, Drawer, Row, Form, Col, Input, Select } from 'antd'
import { Dispatch } from 'redux'
import { Shapes } from 'src/store/shape'
import COLOR from 'src/lib/color'
import { FormInstance } from 'antd/lib/form'

const initialShape: Shapes.IShape = {
  w: 180,
  h: 60,
  shape: '',
  name: '一个矩形',
  color: COLOR.blue
}

class ShapeEditor extends React.Component<ShapeEditor.IProps> {
  formRef = React.createRef<FormInstance>()

  submit = () => {
    const form = this.formRef.current
    if (!form) {
      return
    }
    console.log(form.getFieldsValue())
  }

  close = () => {
    this.props.close()
  }
  onValuesChange = (a: any, b: any) => {
    console.log('change', a, b)
  }
  onFinish = (a: any) => {
    console.log('finish', a)
  }
  onFinishFailed = (a: any) => {
    console.log('finish failed', a)
  }

  render() {
    return (
      <Drawer
        className="shape-editor-dialog"
        title="创建一个图形"
        width="300"
        headerStyle={{ fontSize: '12px', padding: '10px' }}
        closable={ false }
        visible={ this.props.visible }
        onClose={ this.close }
        footer={
          <Footer onSubmit={ this.submit } />
        }>
        <Form
          ref={ this.formRef }
          labelCol={{ span: 6 }}
          size="small"
          labelAlign="left"
          initialValues={ initialShape }
          onValuesChange={ this.onValuesChange }
          onFinish={ this.onFinish }
          onFinishFailed={ this.onFinishFailed }>
          <Form.Item label="标识" name="shape" extra={
            <small>唯一标识,建议使用[字母,数字]</small>
          }>
            <Input />
          </Form.Item>
          <Form.Item label="名称" name="name">
            <Input/>
          </Form.Item>
          <Form.Item label="尺寸">
            <Row gutter={ 10 }>
              <Col span={ 10 }>
                <Form.Item name="w" noStyle>
                  <Input placeholder="宽" suffix="px" />
                </Form.Item>
              </Col>
              <Col span={ 4 }>
                <span className="join-span"><i className="iconfont icon-cross"></i></span>
              </Col>
              <Col span={ 10 }>
                <Form.Item name="h" noStyle>
                  <Input placeholder="高" suffix="px" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Drawer>
    )
  }
}

function Footer({
  onSubmit,
}: {
  onSubmit(): void,
}) {
  return (
    <div className="btn-box">
      <Button type="primary" size="small" onClick={ onSubmit }>确定</Button>
      <Button size="small">取消</Button>
    </div>
  )
}


const mapDispatch = (dispatch: Dispatch) => {
  return {

  }
}

declare namespace ShapeEditor {
  export interface IProps {
    visible: boolean,
    close(): void,
    // dispatch: Dispatch,
  }
}

export default ShapeEditor
