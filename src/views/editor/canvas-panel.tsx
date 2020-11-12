import { Col, Row } from 'antd'
import React from 'react'
import { Editor } from 'simple-dag-editor'
import { Dag } from 'src/store/dag'

const CanvasPanel = ({
  project,
  onDownload,
  onSave,
  config,
  dag,
}: {
  project?: string,
  onDownload(): void,
  onSave(t: string): void,
  config?: Editor.IPageConfig,
  dag: Dag.IState,
}) => {
  const handler = [
    { icon: 'save-new', label: '保存为项目', event: onSave.bind(null, 'save-new') },
    { icon: 'save-as', label: '另存为项目', event: onSave.bind(null, 'save-as') },
    { icon: 'download', label: '下载到本地', event: onDownload },
  ]

  const p = project?.length
            ?
            (<span>{ project }</span>)
            :
            (<span className="disabled">暂未保存为项目</span>)

  return (
    <React.Fragment>
      <div className="panel-title">画布信息</div>
      <div className="canvas-panel">
        <div className="info-box">
          <Row>
            <Col span={ 8 }>所属项目:</Col>
            <Col>{ p }</Col>
          </Row>
          <Row>
            <Col span={ 8 }>画布尺寸:</Col>
            <Col>{ config?.width } * { config?.height }</Col>
          </Row>
          {/* <Row>
            <Col span={ 8 }>画布颜色:</Col>
            <Col>#123456</Col>
          </Row> */}
        </div>
        <div className="handler-box">
          {
            handler.map((h, i) => (
              <div className="panel-row" key={ i } onClick={ h.event }>
                <i className={ `iconfont icon-${h.icon}` }></i>
                { h.label }
              </div>
            ))
          }
        </div>
      </div>
    </React.Fragment>
  )
}

export default CanvasPanel
