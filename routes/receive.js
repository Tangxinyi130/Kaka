const router = require('koa-router')()
const userDAO=require('../model/postcardDAO')
const userCtroller=require("../controllers/postcardController")
router.prefix('/receive');
//根据所输入的明信片id，更新数据库中所对应的明信片的图片
router.get('/uploadPic/:cardId/:cardPic',async (ctx,next)=>{
    await userCtroller.uploadPic(ctx,next)
})

module.exports = router