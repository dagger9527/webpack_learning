const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  let req = ctx.request
  if (!req.path.indexOf('/user')) {
    ctx.body = { name: '大哥哥', age: 18 };
  }
});

app.listen(3000);
console.log('server running..')