import * as React from 'react'
import { connect } from 'react-redux'
import { IState } from '../store'
// import { Menu } from '../store/menu'
import EditorComponent from './editor'
import ProjectComponent from './project'
import ContactView from './contact'
import { Dispatch } from 'redux'
import { toggleMenu } from 'src/actions'

const Content = ({ activeMenu, toggle }: { activeMenu: string, toggle(m: string): void }) => {

  return (
    <div className="content-box">
      { activeMenu === 'project' && <ProjectComponent /> }
      { activeMenu === 'contact' && <ContactView /> }
      <div className="editor-wrapper">
        { activeMenu !== 'editor' && <div className="none-click-wrapper" onClick={ toggle.bind(null, 'editor') }></div> }
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
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggle: (menu: string) => {
      dispatch(toggleMenu(menu))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content)
