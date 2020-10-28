import { CLOSE_DIALOG, OPEN_DIALOG } from "./namespace";

export function openDialog(dialogType: string) {
  return {
    type: OPEN_DIALOG,
    dialogType,
  }
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  }
}
