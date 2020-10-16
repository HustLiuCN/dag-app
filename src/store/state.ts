const state = {
  activeMenu: 'project',
  menus: [
    { name: 'project', desc: '项目列表', icon: 'icon-folder' },
  ],
}

// const actions = {
//   addMenu: {
//     type: 'ADD_MENU',
//     name: ''
//   }
// }

const changeActiveMenu = (state = 'project', action: any) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return action.menu
    default:
      return state
  }
}

const reducer = (state: any, action: any) => {
  return {
    activeMenu: changeActiveMenu(state.activeMenu, action)
  }
}

export {
  state,
  reducer,
}