const router = require('koa-router')();
const managerController = require('../controllers/managerController');
const goodsController = require('../controllers/goodsController');

router.prefix('/manager');
//后台管理登录
router.post('/doLogin', async (ctx, next) => {
    await managerController.doLogin(ctx,next);
});
//活动发布-公告类文章
router.post('/activityEdit',async(ctx,next)=>{
    await managerController.activityEdit(ctx,next);
});
//活动发布-商品类文章
router.post('/activityGoodsEdit',async(ctx,next)=>{
    await managerController.activityGoodsEdit(ctx,next);
});
//活动发布-商品类文章-插入新的商品信息
router.post('/activityGoodsEdit/addGoods',async(ctx,next)=>{
    await goodsController.insertGoods(ctx,next);
});
//活动发布-查看发布过的商品信息
router.post('/activityGoodsEdit/showAllGoods',async(ctx,next)=>{
    await goodsController.getAllGoods(ctx,next);
});
//manager-- 活动管理【查看所有发布过的文章】
router.post('/activityManagerment',async(ctx,next)=>{
    await managerController.getAllActivity(ctx,next);
});
//按活动类型分类列出活动信息
router.get('/activityManagerment/classfic/:dif',async(ctx,next)=>{
    await managerController.getActivityClassify(ctx,next);
});
//按文章id删除一篇文章
router.get('/activityManagerment/delete/:activityId',async(ctx,next)=>{
    await managerController.deleteActivity(ctx,next);
});
//修改已发布过的文章
router.post('/activityManagerment/update',async(ctx,next)=>{
    await managerController.updateActivity(ctx,next);
});

module.exports = router;
