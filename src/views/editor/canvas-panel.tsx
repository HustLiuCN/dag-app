import React from 'react'

const CanvasPanel = ({
  onDownload,
  onSave,
}: {
  onDownload(): void,
  onSave(t: string): void,
}) => {
  const handler = [
    { icon: 'save-new', label: '保存为项目', event: onSave.bind(null, 'save-new') },
    { icon: 'save-as', label: '另存为项目', event: onSave.bind(null, 'save-as') },
    { icon: 'download', label: '下载到本地', event: onDownload },
  ]

  return (
    <React.Fragment>
      <div className="panel-title">画布信息</div>
      <div className="canvas-panel">
        <div className="info-box">123</div>
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
