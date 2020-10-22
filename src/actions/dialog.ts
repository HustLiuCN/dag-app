import { CLOSE_DIALOG, OPEN_DIALOG } from "./namespace";

export function openDialog() {
  return {
    type: OPEN_DIALOG,
  }
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  }
}
