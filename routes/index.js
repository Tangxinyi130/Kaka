const router = require('koa-router')();
const postController = require('../controllers/postcardController');
const userinfoController = require('../controllers/userinfoController');
//首页-实时动态路由
router.get('/realtimeDynamic',async(ctx,next)=>{
    await postController.realtimeDynamic(ctx,next);
})
//首页-本状态条显示当前可以发送的数量占比数据条
router.get('/statusBar/:userId',async(ctx,next)=>{
  await userinfoController.statusBar(ctx,next);
})

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
