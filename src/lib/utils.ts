export function removeListByIndex<T>(arr: T[], i: number): T[] {
  return [
    ...arr.slice(0, i),
    ...arr.slice(i + 1, 0),
  ]
}

export function addList<T>(arr: T[], item: T): T[] {
  return [
    ...arr,
    item,
  ]
}

export function timeStamp16(): string {
  return Date.now().toString(16)
}
