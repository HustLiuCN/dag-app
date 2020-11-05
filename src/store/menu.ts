import { Reducer } from 'redux'
import { TOGGLE_MENU } from '../actions'

export const Menu: Menu.IState = {
  activeMenu: 'contact',
  menus: [
    { key: 'project', name: 'project', desc: '项目列表', icon: 'icon-folder' },
    { key: 'editor', name: 'editor', desc: '画板', icon: 'icon-palette' },
    // { key: 'setting', name: 'setting', desc: '设置', icon: 'icon-setting' },
    { key: 'contact', name: 'contact', desc: '联系作者', icon: 'icon-contact' },
  ],
}
// reducer
export const menuReducer: Reducer<Menu.IState> = (state = Menu, action) => {
  switch(action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        activeMenu: action.menu,
      }
    default:
      return state
  }
}
// actions

export declare namespace Menu {

  export interface IState {
    activeMenu: 'project' | 'editor' | 'setting' | 'contact',
    menus: IMenu[],
  }

  export interface IMenu {
    key: React.Key,   // string | number
    name: string,
    desc: string,
    icon?: string,
  }
}
