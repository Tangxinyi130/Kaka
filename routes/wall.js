const router = require('koa-router')()
const postcardController=require('../controllers/postcardController');
router.prefix('/wall')

//获取展示墙上的照片信息
router.get('/', async(ctx, next)=>{
    await postcardController.getAllCard(ctx,next);
});

//在输入框里输入城市，搜索相关城市的明信片
router.get('/search/:city', async(ctx, next)=>{
    await postcardController.getPostCard(ctx,next);
});

//分页
router.get('/walls/:page', async(ctx, next)=>{
    await postcardController.getPage(ctx,next);
});

module.exports = router;