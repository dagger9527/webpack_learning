// import 'bootstrap'
import './style.css'
// import style from './style'
const style = require('./style')

// fetch('/api/query').then(resp => {
//   resp.json().then(res => {
//     console.log(res)
//   })
// })

console.log(style.default.sum(3, 5))
// console.log(style.default.sum(3, 5))