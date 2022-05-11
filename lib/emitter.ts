// @ts-nocheck
export class Emitter {
  obj: any
  constructor() {
    this.obj = {}
  }

  on(name: string, fn) {
    let list = this.obj[name] || (this.obj[name] = [])
    if (!list.includes(fn)) {
      list.push(fn)
    }
  }

  emit(name: string, ...args: any[]) {
    let list = this.obj[name] || (this.obj[name] = [])
    list.forEach(fn => {
      fn(...args)
    })
  }

  off(name: string, fn) {
    let list = this.obj[name] || (this.obj[name] = [])
    list = list.filter(i => i !== fn)
    this.obj[name] = list
  }

  once(name: string, fn) {
    const that = this
    function onceFn(...args) {
      fn(...args)
      that.off(name, onceFn)
    }
    this.on(name, onceFn)
  }
}
