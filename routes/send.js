const router = require('koa-router')()
const userDAO=require('../model/poolDAO')
const userCtroller=require("../controllers/poolController")
router.prefix('/send');
//获取在最先抽取池里日期最小的用户的id
router.get('/',async (ctx,next)=>{
    await userCtroller.getUserId(ctx,next)
})
//将抽到用户的地区明信片的编号加一
router.get('/massages/updatePostcard/region/updateRegionNum',async (ctx,next)=>{
    await userCtroller.updateRegion(ctx,next)
})
// 查询抽到用户地区明信片编号和数量
router.get('/massages/updatePostcard/region/getRegion',async (ctx,next)=>{
    await userCtroller.getRegion(ctx,next)
})
//将查询到的明信片和编号结合成一个cardId
router.get('/massages/updatePostcard/setCardId',async (ctx,next)=>{
    await userCtroller.setCarId(ctx,next)
})
//将cardId和发送方已经接收方的信息插入到postcard
router.get('/massages/insertPostcard',async (ctx,next)=>{
    await userCtroller.insertPostcard(ctx,next)
})
//获得接受方信息和cardId并渲染到页面
module.exports = router