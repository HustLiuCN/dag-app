// import { Dispatch } from 'redux'
import { TOGGLE_MENU } from './namespace'

export const toggleMenu = (menu: React.Key) => {
  return {
    type: TOGGLE_MENU,
    menu,
  }
}
