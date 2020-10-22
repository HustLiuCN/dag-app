import { Reducer } from "redux"
import { CLOSE_DIALOG, OPEN_DIALOG, TOGGLE_DIALOG } from "src/actions"

export const DialogStatus = {
  visible: true,
}

export const dialogReducer: Reducer<Dialog.IState> = (state = DialogStatus, action) => {
  switch(action.type) {
    case OPEN_DIALOG:
      return {
        visible: true,
      }
    case CLOSE_DIALOG:
      return { visible: false }
    case TOGGLE_DIALOG:
      return { visible: !state.visible }
    default:
      return state
  }
}

export declare namespace Dialog {
  export interface IState {
    visible: boolean,
  }
}
