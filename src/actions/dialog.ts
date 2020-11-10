import { CLOSE_DIALOG, OPEN_DIALOG } from "./namespace";

export function openDialog(dialogType: string, args?: any) {
  return {
    type: OPEN_DIALOG,
    dialogType,
    args,
  }
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  }
}
