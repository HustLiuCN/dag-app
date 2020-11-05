import * as React from 'react'
import { connect } from 'react-redux'
import { IState } from '../store'
// import { Menu } from '../store/menu'
import EditorComponent from './editor'
import ProjectComponent from './project'
import ContactView from './contact'

const Content = ({ activeMenu }: { activeMenu: string }) => {
  return (
    <div className="content-box">
      { activeMenu === 'project' && <ProjectComponent /> }
      { activeMenu === 'contact' && <ContactView /> }
      <div className="editor-wrapper">
        <EditorComponent />
      </div>
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
