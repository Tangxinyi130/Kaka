const router = require('koa-router')();
const postController = require('../controllers/postcardController');
const userinfoController = require('../controllers/userinfoController');
//index--首页-用户数据信息
router.get("/userCard/:userId",async(ctx,next)=>{
    await userinfoController.getUserCard(ctx,next);
});

//index--首页-实时动态路由
router.post('/realtimeDynamic',async(ctx,next)=>{
    await postController.realtimeDynamic(ctx,next);
});
//index--首页-本状态条显示当前可以发送的数量占比数据条
router.get('/statusBar/:userId',async(ctx,next)=>{
  await userinfoController.statusBar(ctx,next);
});
//index--首页-用户收件排行榜
router.post('/rankingSend',async(ctx,next)=>{
    await userinfoController.getSendRanking(ctx,next);
})
//index--首页-最新的明信片推荐墙
router.post('/recentPostcards',async(ctx,next)=>{
    await postController.getTenRecentPostcard(ctx,next);
})


module.exports = router;
