import * as React from 'react'
import { Button, Drawer, Row, Form, Col, Input, Select, InputNumber } from 'antd'
import { Dispatch } from 'redux'
import { Shapes } from 'src/store/shape'
import COLOR from 'src/lib/color'
import { FormInstance } from 'antd/lib/form'
// import { randomID } from 'src/lib/utils'
import { addShape } from 'src/actions/shape'
import { connect } from 'react-redux'
import { IState } from 'src/store'
import { Editor } from 'simple-dag-editor'

// default shape
const defaultShapeForm: ShapeEditor.IForm = {
  w: 180,
  h: 40,
  shape: 'shape_123',
  name: '一个矩形',
  color: COLOR.green,
  graph: 'rect',
  category: '',
  input: 1,
  output: 1,
}
const graphs = [{ label: '矩形', val: 'rect' }]

class ShapeEditor extends React.Component<ShapeEditor.IProps> {
  formRef = React.createRef<FormInstance>()

  submit = () => {
    const form = this.formRef.current
    if (!form) {
      return
    }
    const shape = this.serialiseFormToShape(form.getFieldsValue())
    console.log(shape)
    this.props.addShape(shape)
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

  serialiseFormToShape(form: ShapeEditor.IForm): Shapes.IShape {
    let anchors = []
    const { input, output } = form
    if (input) {
      const d = 1 / (input + 1)
      for (let i = 0; i < input; i ++) {
        let a: Editor.IAnchor = [
          d * (i + 1),
          0,
          'input',
        ]
        anchors.push(a)
      }
    }
    if (output) {
      const d = 1 / (output + 1)
      for (let i = 0; i < output; i ++) {
        let a: Editor.IAnchor = [
          d * (i + 1),
          1,
          'output',
        ]
        anchors.push(a)
      }
    }
    return {
      ...form,
      anchors,
    }
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
          <Footer onSubmit={ this.submit } onCancel={ this.close } />
        }>

        <Form
          ref={ this.formRef }
          layout="vertical"
          initialValues={ defaultShapeForm }
          onValuesChange={ this.onValuesChange }
          onFinish={ this.onFinish }
          onFinishFailed={ this.onFinishFailed }>

          <Form.Item
            label="唯一标识"
            name="shape"
            tooltip={ <small>唯一标识,建议使用字母,数字,下划线组合</small> }
            required
            rules={[
              {
                validator: (rule, value) => {
                  const val = value.trim()
                  if (!val.length) {
                    return Promise.reject(<small>唯一标识 不能为空</small>)
                  }
                  if (!val.match(/^\w+$/)) {
                    return Promise.reject(<small>唯一标识 仅支持数字、字母、下划线</small>)
                  }
                  // TODO
                  console.log(this.props.shapeList)
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="名称"
            name="name"
            tooltip={ <small>建议长度在8个字符内</small> }
            rules={[ { required: true, whitespace: true } ]}
            >
            <Input/>
          </Form.Item>

          <Form.Item label="形状" name="graph" required>
            <Select>
              {
                graphs.map(g => (
                  <Select.Option value={ g.val } key={ g.val }>{ g.label }</Select.Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item label="尺寸" required={ true }>
            <SizeControll />
          </Form.Item>

          <Form.Item noStyle shouldUpdate={ (prev, cur) => prev.color !== cur.color }>
            {
              ({ getFieldValue }) => {
                const color = getFieldValue('color')
                console.log(color)
                return (
                  <Form.Item
                    label="颜色"
                    name="color"
                    normalize={ color => `#${color.replace(/^#/, '')}` }
                    rules={[
                      {
                        validator: (r, val) => {
                          if (val.match(/^(#?)([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)) {
                            return Promise.resolve()
                          }
                          return Promise.reject(<small>请输入合法的6或3位数十六进制RGB色值</small>)
                        },
                      },
                    ]}
                    >
                    <Input addonAfter={ <ColorPreview color={ color } /> }></Input>
                  </Form.Item>
                )
              }
            }
          </Form.Item>


          <Form.Item
            label="输入点个数"
            name="input"
            rules={[
              { type: 'integer', min: 0, max: 4 },
            ]}
            >
            <InputNumber min={ 0 } max={ 4 }></InputNumber>
          </Form.Item>

          <Form.Item
            label="输出点个数"
            name="output"
            rules={[
              { type: 'integer', min: 0, max: 4 },
            ]}
            >
            <InputNumber min={ 0 } max={ 4 }></InputNumber>
          </Form.Item>

          <Form.Item label="分类" name="category">
            <Select>
              <Select.Option value={ '' }>无</Select.Option>
              {
                this.props.categoryList.map(c => (
                  <Select.Option value={ c }>{ c }</Select.Option>
                ))
              }
            </Select>
          </Form.Item>

        </Form>
      </Drawer>
    )
  }
}

// size fields
function SizeControll() {
  return (
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
  )
}
// color preview
function ColorPreview({ color }: { color : string}) {
  return (
    <span style={{ backgroundColor: color, width: '20px', height: '20px', display: 'block' }}></span>
  )
}

// footer
function Footer({
  onSubmit,
  onCancel,
}: {
  onSubmit(): void,
  onCancel(): void,
}) {
  return (
    <div className="btn-box">
      <Button type="primary" onClick={ onSubmit }>确定</Button>
      <Button onClick={ onCancel }>取消</Button>
    </div>
  )
}

// state
const mapState = (state: IState) => {
  const { shape } = state
  return {
    ...shape,
  }
}
// action
const mapDispatch = (dispatch: Dispatch) => {
  return {
    addShape: (shape: Shapes.IShape) => {
      return dispatch(addShape(shape))
    },
  }
}
// interface
declare namespace ShapeEditor {
  export interface IProps extends Shapes.IState {
    visible: boolean,
    close(): void,
    // dispatch: Dispatch,
    addShape(shape: Shapes.IShape): void,
    initialShape?: Shapes.IShape,
  }
  export interface IForm extends Shapes.IShape {
    input?: number,
    output?: number,
  }
}
// export
export default connect(
  mapState,
  mapDispatch,
)(ShapeEditor)
