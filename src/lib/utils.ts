// list
export namespace List {
  export function remove<T>(arr: T[], i = -1): T[] {
    return i < 0 ? arr : [ ...arr.slice(0, i), ...arr.slice(i + 1) ]
  }
  export function update<T>(arr: T[], item: T, i = -1): T[] {
    return i < 0 ? arr : [ ...arr.slice(0, i), item, ...arr.slice(i + 1) ]
  }
  export function insert<T>(arr: T[], item: T): T[] {
    return [ ...arr, item ]
  }
  export function updateInsert<T>(arr: T[], item: T, i = -1): T[] {
    return i < 0 ? [ ...arr, item ] : [ ...arr.slice(0, i), item, ...arr.slice(i + 1) ]
  }
}

export function timeStamp16(): string {
  return Date.now().toString(16)
}

export function isLocal() {
  return window.location.host.match(/localhost/)
}
