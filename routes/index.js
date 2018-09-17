const router = require('koa-router')();
const postController = require('../controllers/postcardController');
const userinfoController = require('../controllers/userinfoController');
//index--首页-用户数据信息
router.get("/userCard/:userId",async(ctx,next)=>{
    await userinfoController.getUserCard(ctx,next);
});

//index--首页-实时动态路由
router.get('/realtimeDynamic',async(ctx,next)=>{
    await postController.realtimeDynamic(ctx,next);
});
//index--首页-本状态条显示当前可以发送的数量占比数据条
router.get('/statusBar/:userId',async(ctx,next)=>{
  await userinfoController.statusBar(ctx,next);
});


module.exports = router;
