const router = require('koa-router')()
const postcardController=require('../controllers/postcardController');
const collectionController=require('../controllers/collectionController');
router.prefix('/postcards')

//获取展示墙上的照片信息，以及该卡片被评论的内容
router.get('/:cardId', async(ctx, next)=>{
    await postcardController.getCardInformation(ctx,next);
});
//postcard里添加评论图片的内容
router.post('/addcomment', async(ctx, next)=>{
    await postcardController.addComment(ctx,next);
});
//postcard获取明信片被收藏的用户数量和被点赞数量
router.get('/collection/:cardId', async(ctx, next)=>{
    await collectionController.getCollectionNumber(ctx,next);
});
//postcard查询明信片是否存在收藏表里
router.get('/getcollection/:cardId/:userId', async(ctx, next)=>{
    await collectionController.checkCollection(ctx,next);
});
//用户关注，点赞数加1
router.get('/like/:cardId', async(ctx, next)=>{
    await postcardController.addLike(ctx,next);
});
//用户取消关注，点赞数减1
router.get('/unlike/:cardId', async(ctx, next)=>{
    await postcardController.unLike(ctx,next);
});

//收藏明信片，插入收藏用户id和卡片id
router.get('/collect/:cardId/:userId', async(ctx, next)=>{
    await collectionController.insertCollection(ctx,next);
});
//收藏明信片，删除收藏用户id和卡片id
router.get('/uncollect/:cardId/:userId', async(ctx, next)=>{
    await collectionController.deleteCollection(ctx,next);
});

//地图上显示发送方和收取方两地
router.get("/map/:sendUserId/:receiveUserId", async (ctx, next) => {
    await postcardController.showPath(ctx, next);
});


module.exports = router;