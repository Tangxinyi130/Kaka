const router = require('koa-router')()
const postcardController=require("../controllers/postcardController")
const poolCtroller=require("../controllers/poolController")

router.prefix('/receive');
//根据所输入的明信片id，更新数据库中所对应的明信片的图片
router.get('/uploadPic/:cardId/:cardPic',async (ctx,next)=>{
    await postcardController.uploadPic(ctx,next)
})
//实现接收功能,更新了postcard里的接收时间和把发送方添加到池里面，距离还没写
router.get('/Receive/:cardId',async (ctx,next)=>{
    await postcardController.Receive (ctx,next)
})

module.exports = router