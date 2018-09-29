const router = require('koa-router')()

const poolCtroller=require("../controllers/poolController")
router.prefix('/send');


//完成发送功能，返回接收方一些基本信息和发送的明信片信息
router.get('/sendPostcard/:userId',async (ctx,next)=>{
    await poolCtroller.sendPostcard(ctx,next)
})


module.exports = router