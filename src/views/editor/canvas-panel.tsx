import React from 'react'

const CanvasPanel = () => {
  return (
    <React.Fragment>
      <div className="panel-title">画布信息</div>
      <div className="canvas-panel">
        <div className="info-box">123</div>
        <div className="handler-box">
          <div className="panel-row">
            <i className="iconfont icon-save-new"></i>
            保存为项目
          </div>
          <div className="panel-row">
            <i className="iconfont icon-save-as"></i>
            另保存为项目
          </div>
          <div className="panel-row">
            <i className="iconfont icon-download"></i>
            下载到本地
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CanvasPanel
