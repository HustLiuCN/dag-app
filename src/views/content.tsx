import React from 'react'
import { connect } from 'react-redux'
import { IState } from 'src/store'
import EditorView from './editor'
import ProjectView from './project'
import ContactView from './contact'
import { Dispatch } from 'redux'
import { toggleMenu } from 'src/actions'

const Content = ({
  activeMenu,
  toggleMenu,
}: {
  activeMenu: string,
  toggleMenu(m: string): void,
}) => {

  return (
    <div className="content-box">
      { activeMenu === 'project' && (<ProjectView />) }
      { activeMenu === 'contact' && (<ContactView />) }
      <div className="editor-wrapper">
        {
          activeMenu !== 'editor'
          &&
          (<div className="none-click-wrapper" onClick={ () => toggleMenu('editor') }></div>)
        }
        <EditorView />
      </div>
    </div>
  )
}

const mapState = (state: IState) => {
  const { menu } = state
  return {
    activeMenu: menu.activeMenu,
  }
}
const mapDispatch = (dispatch: Dispatch) => {
  return {
    toggleMenu: (menu: string) => {
      dispatch(toggleMenu(menu))
    },
  }
}


export default connect(
  mapState,
  mapDispatch,
)(Content)
