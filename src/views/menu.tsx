import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { IState } from '../store'
import { Menu } from '../store/menu'
import { toggleMenu } from '../actions'

class AsideMenu extends React.Component<AsideMenu.IProps> {
  // constructor(props: AsideMenu.IProps) {
  //   super(props)
  // }
  changeMenu = (key: string) => {
    this.props.toggle(key)
  }
  // componentDidUpdate(prev: AsideMenu.IProps) {
  //   console.log(prev.activeMenu, this.props.activeMenu)
  // }

  render() {
    const { activeMenu } = this.props
    return (
      <div className="aside-menu">
        {
          this.props.menus.map(m => (
            <div
              key={ m.key }
              className={ `menu-item ${ activeMenu === m.key ? 'active' : '' }` }
              onClick={ this.changeMenu.bind(null, m.key) }>
              <i className={`iconfont ${m.icon}`}></i>
            </div>
          ))
        }
      </div>
    )
  }
}

// interface
export declare namespace AsideMenu {
  export interface IProps extends Menu.IState {
    toggle(menu: string): void,
  }
}
// state to props
const mapStateToProps = (state: IState) => {
  const { menu } = state
  return {
    ...menu,
  }
}
// actions
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
)(AsideMenu)
