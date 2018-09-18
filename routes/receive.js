const router = require('koa-router')()
const postcardController=require("../controllers/postcardController")
const poolCtroller=require("../controllers/poolController")

router.prefix('/receive');
//根据所输入的明信片id，更新数据库中所对应的明信片的图片
router.get('/uploadPic/:cardId/:cardPic',async (ctx,next)=>{
    await postcardController.uploadPic(ctx,next)
})
//根据输入明信片的id,更新postcad中明信片的接收时间，距离还没写
router.get('/upReceiveTime/:cardId',async (ctx,next)=>{
    await postcardController.upReceiveTime(ctx,next)
})
module.exports = router