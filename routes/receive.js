const router = require('koa-router')();
const postcardController=require("../controllers/postcardController");
const poolCtroller=require("../controllers/poolController");

router.prefix('/receive');
//根据所输入的明信片id，更新数据库中所对应的明信片的图片
router.get('/uploadPic/:cardId/:cardPic',async (ctx,next)=>{
    await postcardController.uploadPic(ctx,next)
});
//实现接收功能,更新了postcard里的接收时间和把发送方添加到池里面，距离还没写
router.get('/doReceive/:cardId',async (ctx,next)=>{
    await postcardController.receive (ctx,next)
});

//提供两个用户的地址，由前端进行距离计算
router.get("/getAddress/:sendUserId/:receiveUserId", async (ctx, next) => {
    await postcardController.calculateDistance(ctx, next);
});
//获取前端计算完成的距离，插入对应的明信片信息中
router.get("/insertDistance/:distance/:cardId", async (ctx, next) => {
    await postcardController.updateDistance(ctx, next);
});

module.exports = router;