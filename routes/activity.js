const router = require('koa-router')()
const activityController=require('../controllers/activityController');
const mygoodsController=require('../controllers/mygoodsController');
router.prefix('/activity')

//获取活动界面信息
router.get('/', async(ctx, next)=>{
    await activityController.getAllActivity(ctx,next);
});

//点击每个主题活动
router.get('/topic/:activityId', async(ctx, next)=>{
    await  activityController.getActivity(ctx,next);
});

//点击立即预约
router.get('/address/:activityId', async(ctx, next)=>{
    await  activityController.getActivityDetail(ctx,next);
});

//确认支付(两个表中都插入数据)
router.get('/mygoods/:activityId/:goodsId', async(ctx, next)=>{
    await mygoodsController.addMyGoods(ctx,next);
});

//activity通过年份月份查找相关的活动
router.get('/:year/:month', async(ctx, next)=>{
    await activityController.getActivityTime(ctx,next);
});
module.exports = router;