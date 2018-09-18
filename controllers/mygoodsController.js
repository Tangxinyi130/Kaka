const mygoodsDAO=require("../model/mygoodsDAO");
module.exports={
    addMyGoods:async (ctx,next)=>{
        try{
                const userId=1;
                let activityId=ctx.params.activityId;
                let goodsId=ctx.params.goodsId;
                let allId={
                    activityId:activityId,
                    goodsId:goodsId,
                    userId:userId
                };
                await mygoodsDAO.addMyGoods(allId);
                await mygoodsDAO.addMyActivity(allId);
                ctx.body={"code":200,"message":"ok",data:[]};
            }catch (e){
                ctx.body={"code":500,"message":"添加mygoods错误！"+e.message,data:[]};
            }
    }
}