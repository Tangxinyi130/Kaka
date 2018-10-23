const router = require('koa-router')()

const poolCtroller=require("../controllers/poolController")
router.prefix('/send');
//限制发送次数为5次和判断发送池里面有没有数据
router.get('/limitTimes/:userId',async (ctx,next)=>{
    await poolCtroller.limitTimes(ctx,next)
})
//完成发送功能，返回接收方一些基本信息和发送的明信片信息
router.get('/sendPostcard/:userId',async (ctx,next)=>{
    await poolCtroller.sendPostcard(ctx,next)
})
//向发送方发送邮件
router.get('/sendEmail/:userId',async (ctx,next)=>{
    await poolCtroller.sendEmail(ctx,next)
})


module.exports = router