const router = require('koa-router')()

const poolCtroller=require("../controllers/poolController")
router.prefix('/send');

//获得接受方信息和cardId
router.get('/getMessage/:userId',async (ctx,next)=>{
    await poolCtroller.getMessage(ctx,next)
})
//向明信片卡里面插入抽到的明信片的id,和接收方以及发送方的一些基本信息
router.get('/sendPostcard/:userId',async (ctx,next)=>{
    await poolCtroller.sendPostcard(ctx,next)
})


module.exports = router