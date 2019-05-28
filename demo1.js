require('./demo2')
// require('!style-loader!css-loader!./css/demo1.css')
// require('!style-loader!css-loader!./css/demo2.css')
require('./css/demo1.css')
require('./css/demo2.css')

var img1 = document.createElement("img");
img1.src = require("./img/7f0499d0a2d3990ed54813011665cf1e.jpg");
document.querySelector('#app').appendChild(img1)

document.write('It works')