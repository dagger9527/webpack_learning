// import { AsyncParallelBailHook } from 'tapable';
const { AsyncParallelHook, AsyncSeriesHook } = require('tapable')

// AsyncParallelHook: 异步并行
// AsyncSeriesHook: 异步串行

class AsyncParalleBailHookLesson {
  constructor(args) {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    let finalCallback = args.pop()
    let index = 0
    let done = () => {
      ++index
      if (index === this.tasks.length) {
        finalCallback()
      }
    }
    this.tasks.forEach(task => task(...args, done))
  }
}

let hook = new AsyncParallelHook(['name'])

hook.tapAsync('react', function (name, callback) {
  console.log('react', name);
  setTimeout(() => {
    callback()
  }, 1000)
})

hook.tapAsync('node', function (name, callback) {
  console.log('node', name);
  setTimeout(() => {
    callback()
  }, 1000)
})

hook.tapAsync('webpack', function (name, callback) {
  console.log('webpack', name);
  setTimeout(() => {
    callback()
  }, 1000)
})

hook.callAsync('jw', () => {
  console.log('end..')
})
