const goodsDAO = require('../model/goodsDAO');
//活动发布-商品类文章-新增商品信息
module.exports={
    //插入商品信息
    insertGoods:async(ctx,next)=>{
        try{
            let goodsInfo = ctx.request.body;
            await goodsDAO.insertGoods(goodsInfo.goodsActivityId,goodsInfo.goodsName,goodsInfo.goodsNum,goodsInfo.goodsPrice,goodsInfo.goodsPic,goodsInfo.goodsDetails);
            ctx.body = {code:200,"message":"插入成功,插入的数据是：",data:goodsInfo}
        }catch (e) {
            ctx.body = {code:500,"message":"服务器出错"+e.toString(),data:[]}
        }
    },
    //查询所有商品信息
    getAllGoods:async(ctx,next)=>{
        try{
            let goodsInfo = await goodsDAO.getAllGoods();
            ctx.body = {code:200,"message":"查询成功，商品信息是：",data:goodsInfo}
        }catch (e) {
            ctx.body = {code:500,"message":"服务器出错"+e.toString(),data:[]}
        }
    },
};