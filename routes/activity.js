const router = require('koa-router')()
const activityController=require('../controllers/activityController');
router.prefix('/activity')

//获取活动界面信息
router.get('/', async(ctx, next)=>{
    await activityController.getAllActivity(ctx,next);
});

//点击每个主题活动
router.get('/topic/:activityId', async(ctx, next)=>{
    await  activityController.getActivity(ctx,next);
});

//点击每个主题活动
router.get('/address/:activityId', async(ctx, next)=>{
    await  activityController.getActivity(ctx,next);
});
module.exports = router;