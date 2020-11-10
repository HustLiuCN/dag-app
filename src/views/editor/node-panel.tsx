import * as React from 'react'
import { Form, Input } from 'antd'
import { SizeControll } from '../form/form-shape-size'
import { Dag } from 'src/store/dag'
import { FormInstance } from 'antd/lib/form'

class DetailPanel extends React.Component<DetailPanel.IProps> {
  formRef = React.createRef<FormInstance>()

  componentDidUpdate(prevProps: DetailPanel.IProps) {
    // TODO
    if (this.props.selectedNode && this.props.selectedNode !== prevProps.selectedNode) {
      this.formRef.current?.resetFields()
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="panel-title">所选节点信息</div>
        <Form
          ref={ this.formRef }
          layout="vertical"
          initialValues={ this.props.selectedNode }
          >

          <Form.Item
            label="名称"
            name="name"
            tooltip={ <small>建议长度在8个字符内</small> }
            rules={[ { required: true, whitespace: true } ]}
            >
              <Input readOnly />
          </Form.Item>

          <Form.Item label="尺寸" required>
            <SizeControll readonly width="w" height="h"></SizeControll>
          </Form.Item>
        </Form>
      </React.Fragment>

    )
  }
}

declare namespace DetailPanel {
  export interface IProps {
    selectedNode?: Dag.INode,
  }
}

export default DetailPanel
