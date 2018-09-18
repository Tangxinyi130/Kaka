const router = require('koa-router')()

const poolCtroller=require("../controllers/poolController")
router.prefix('/send');
//获取在最先抽取池里日期最小的用户的id
router.get('/massages/updatePostcard/region/getUserId',async (ctx,next)=>{
    await poolCtroller.getUserId(ctx,next)
})
//获得抽到的用户的地区
router.get('/massages/updatePostcard/region/getCardReceiveRegion',async (ctx,next)=>{
    await poolCtroller.getCardReceiveRegion(ctx,next)
})
//得到发送用户的地区
router.get('/massages/updatePostcard/region/getCardSendRegion/:userId',async (ctx,next)=>{
    await poolCtroller.getCardSendRegion(ctx,next)
})
//将抽到用户的地区明信片的编号加一
//得到当前发送用户的地区明信片的编号加一
router.get('/massages/updatePostcard/region/updateRegionNum/:userId',async (ctx,next)=>{
    await poolCtroller.updateRegion(ctx,next)
})
// 查询当前用户地区明信片编号和数量
router.get('/massages/updatePostcard/region/getRegion/:userId',async (ctx,next)=>{
    await poolCtroller.getRegion(ctx,next)
})
// // 查询抽到用户地区明信片编号和数量
// router.get('/massages/updatePostcard/region/getRegion',async (ctx,next)=>{
//     await userCtroller.getRegion(ctx,next)
// })
//将查询到的明信片和编号结合成一个cardId
router.get('/massages/updatePostcard/setCardId/:userId',async (ctx,next)=>{
    await poolCtroller.setCarId(ctx,next)
})
//将cardId和发送方已经接收方的信息插入到postcard
router.get('/massages/insertPostcard/:userId',async (ctx,next)=>{
    await poolCtroller.insertPostcard(ctx,next)
})
//获取接收方的一些基本信息
router.get('/getReceiveMessage',async (ctx,next)=>{
    await poolCtroller.getReceiveMessage(ctx,next)
})
//获得接受方信息和cardId并渲染到页面
router.get('/getMessage/:userId',async (ctx,next)=>{
    await poolCtroller.getMessage(ctx,next)
})
//把接收方方从pool池里面删除
router.get('/delectReceive',async (ctx,next)=>{
    await poolCtroller.delectReceive(ctx,next)
})
module.exports = router