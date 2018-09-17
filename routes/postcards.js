const router = require('koa-router')()
const postcardController=require('../controllers/postcardController');
const collectionController=require('../controllers/collectionController');
router.prefix('/postcards')

//获取展示墙上的照片信息
router.get('/:cardId', async(ctx, next)=>{
    await postcardController.getCardInformation(ctx,next);
});
//postcard里评论图片的内容
router.post('/addcomment', async(ctx, next)=>{
    await postcardController.addComment(ctx,next);
});
//postcard获取明信片被收藏的用户数量
router.get('/collection/:cardId', async(ctx, next)=>{
    await collectionController.getCollectionNumber(ctx,next);
});

module.exports = router;