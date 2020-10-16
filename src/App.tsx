import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EditorComponent } from './views/editor'
import { AsideMenu } from './views/menu'
// import { Button } from 'antd'

function App({ activeMenu, toggleMenu }: any) {
  return (
    <div id="app">
      <AsideMenu />
      <EditorComponent />
      <div onClick={ toggleMenu }>{ activeMenu }</div>
    </div>
  )
}

const getMenu = (menu: any) => menu.activeMenu
const mapStateToProps = (state: any) => {
  return {
    activeMenu: getMenu(state),
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleMenu: (menu: string) => {
      dispatch({ type: 'TOGGLE_MENU', menu: 'nihao' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
