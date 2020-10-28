import { Reducer } from "redux"
import { CLOSE_DIALOG, OPEN_DIALOG, TOGGLE_DIALOG } from "src/actions"

export const DialogStatus = {
  visible: false,
  type: null,
}

export const dialogReducer: Reducer<Dialog.IState> = (state = DialogStatus, action) => {
  switch(action.type) {
    case OPEN_DIALOG:
      return {
        visible: true,
        type: action.dialogType,
      }
    case CLOSE_DIALOG:
      return { visible: false, type: null }
    case TOGGLE_DIALOG:
      return { visible: !state.visible, type: null }
    default:
      return state
  }
}

export declare namespace Dialog {
  export interface IState {
    visible: boolean,
    type: string | null | undefined,
  }
}
