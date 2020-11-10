import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Menu as MenuComp } from 'antd'
import { MenuInfo as MenuEvent } from 'rc-menu/lib/interface'

import { IState } from '../store'
import { Menu } from '../store/menu'
import { toggleMenu } from '../actions'

class AsideMenu extends React.Component<AsideMenu.IProps> {
  // constructor(props: AsideMenu.IProps) {
  //   super(props)
  // }
  changeMenu = ({ key }: MenuEvent) => {
    this.props.toggle(key)
  }
  // componentDidUpdate(prev: AsideMenu.IProps) {
  //   console.log(prev.activeMenu, this.props.activeMenu)
  // }

  render() {
    return (
      <MenuComp
        className="aside-menu"
        theme="dark"
        defaultSelectedKeys={ [this.props.activeMenu] }
        onClick={ this.changeMenu }>
        {
          this.props.menus.map(m => (
            <MenuComp.Item key={m.key} className="menu-item">
              <i className={`iconfont ${m.icon}`}></i>
            </MenuComp.Item>
          ))
        }
      </MenuComp>
    )
  }
}

// interface
export declare namespace AsideMenu {
  export interface IProps extends Menu.IState {
    toggle(menu: React.Key): void,
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
    toggle: (menu: React.Key) => {
      dispatch(toggleMenu(menu))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AsideMenu)
