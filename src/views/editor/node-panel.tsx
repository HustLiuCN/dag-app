import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { SizeControll } from '../form/form-shape-size'
import { Dag } from 'src/store/dag'

const DetailPanel = (props: DetailPanel.IProps) => {
  const { selectedNode, update } = props
  const [form] = Form.useForm()

  // selected node changed effect
  useEffect(() => {
    form.resetFields()
  }, [selectedNode, form])

  // form change
  const change = () => {
    const changedNode = form.getFieldsValue()
    const newNode = {
      ...selectedNode,
      ...changedNode,
    }
    update(newNode)
  }

  return (
    <React.Fragment>
      <div className="panel-title">所选节点信息</div>
      <Form
        form={ form }
        layout="vertical"
        initialValues={ selectedNode }
        onValuesChange={ change }
        >

        <Form.Item
          label="名称"
          name="name"
          tooltip={ <small>建议长度在8个字符内</small> }
          rules={[ { required: true, whitespace: true } ]}
          >
            <Input />
        </Form.Item>

        <Form.Item label="尺寸" required>
          <SizeControll width="w" height="h"></SizeControll>
        </Form.Item>
      </Form>
    </React.Fragment>

  )
}

declare namespace DetailPanel {
  export interface IProps {
    selectedNode?: Dag.INode,
    update(n: Dag.INode): void,
  }
}

export default DetailPanel
