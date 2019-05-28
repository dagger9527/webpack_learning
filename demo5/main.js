// require('file-loader!./demo1')
// const $ = require('jquery')
// require('./index.less')

// $('body').append('<p>gvagagagag</p>')

// require("@babel/polyfill"); // 自动实现'abc'.include('b')这样的高级语法, Array.prototype.include = function(){...}
// require('expose-loader?$!jquery')  // 用expose-loader将jquery暴露到window下的全局变量, $
// const $ = require('jquery')
import 'babel-polyfill' // 使用@babel/polyfill在production模式下打包失败，所以这里使用了babel-polyfill
import './css/index.less'
import './css/index.css'
// import './js/demo1'
// require('../index.css')

// console.log(window.$)
console.log($)

// console.log($)
// console.log('agag')

@log
class Student {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }
}

let s = new Student('张三', 18)
// console.log(s._name)

function log(target) {
  // console.log(target) // target就是被装饰的类(Student)
}

async function* agf() {
  await 1;
  yield 2;
}

// console.log(agf().next().then((res => {console.log(res.value)}))) // 2

// console.log('abc'.includes('b'))
// console.log('abc'.includes('b'))