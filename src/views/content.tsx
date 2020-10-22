import * as React from 'react'
import { connect } from 'react-redux'
import { IState } from '../store'
// import { Menu } from '../store/menu'
import EditorComponent from './editor'

function Content({ activeMenu }: { activeMenu: string }) {
  return (
    <div className="content-box">
      <EditorComponent />
    </div>
  )
}

const mapStateToProps = (state: IState) => {
  const { menu } = state
  return {
    activeMenu: menu.activeMenu,
  }
}

export default connect(
  mapStateToProps,
)(Content)
