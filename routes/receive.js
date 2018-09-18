const router = require('koa-router')()
const postcardController=require("../controllers/postcardController")
const poolController=require("../controllers/poolController")
router.prefix('/receive');
//根据所输入的明信片id，更新数据库中所对应的明信片的图片
router.get('/uploadPic/:cardId/:cardPic',async (ctx,next)=>{
    await postcardController.uploadPic(ctx,next)
})
//根据输入明信片的id,更新postcad中明信片的接收时间
router.get('/upReceiveTime/:cardId',async (ctx,next)=>{
    await postcardController.upReceiveTime(ctx,next)
})
//查寻时间最小的poolTime
router.get('/delect/selMinTime',async (ctx,next)=>{
    await poolController.selMinTime(ctx,next)
})
//把接收方方从pool池里面删除
router.get('/delectReceive',async (ctx,next)=>{
    await poolController.delectReceive(ctx,next)
})
//把发送方添加到pool池里
router.get('/insertSend/:userId',async (ctx,next)=>{
    await poolController.insertSend(ctx,next)
})

module.exports = router