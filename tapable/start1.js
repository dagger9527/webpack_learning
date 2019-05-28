let { SyncHook, SyncBailHook, AsyncParallelHook } = require('tapable')

// SyncBailHook：在钩子函数中return的不是undefined，会停止后面钩子的执行; SyncHook反之

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['name', 'd']),
    }
  }

  tap() {
    this.hooks.arch.tapAsync('node', (name, d, call) => {
      console.log('node', name, d)
      setTimeout(() => {
        call()  // 异步执行完成
      }, 1000)
      // return 'I want stop learn'
    })
    this.hooks.arch.tapAsync('react', (name, d, call) => {
      console.log('react', name, d)
      call()  // 异步执行完成
    })
  }

  start() {
    this.hooks.arch.callAsync('dagger', 'g', () => {
      console.log('end..')
    })
  }
}

let l = new Lesson()
l.tap() // 注册事件
l.start()