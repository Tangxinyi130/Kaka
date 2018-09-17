const router = require('koa-router')()
const postcardController=require('../controllers/postcardController');
router.prefix('/postcards')

//获取展示墙上的照片信息
router.get('/:cardId', async(ctx, next)=>{
    await postcardController.getCardInformation(ctx,next);
});
//postcard里评论图片的内容
router.post('/addcomment', async(ctx, next)=>{
    await postcardController.addComment(ctx,next);
});


module.exports = router;