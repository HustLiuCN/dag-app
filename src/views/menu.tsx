import * as React from 'react'

export class AsideMenu extends React.Component {
  render() {
    return (
      <div className="aside-menu">
        <div className="tabs">
          <i className="tab-item active iconfont icon-folder"></i>
          <i className="tab-item iconfont icon-palette"></i>
        </div>
        <div className="menu-content">

        </div>
      </div>
    )
  }
}