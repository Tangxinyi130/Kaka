const mygoodsDAO=require("../model/mygoodsDAO");
module.exports={
    addMyGoods:async (ctx,next)=>{
        try{
                const userId=1;
                let activityId=ctx.request.body.activityId;
                let goodsId=ctx.request.body.goodsId;
                let goodsAddress=ctx.request.body.goodsAddress;
                let goodsTime=new Date();
                let allId={
                    activityId:activityId,
                    goodsId:goodsId,
                    userId:userId,
                    goodsTime:goodsTime,
                    goodsAddress:goodsAddress
                };

                await mygoodsDAO.addMyGoods(allId);
                await mygoodsDAO.addMyActivity(allId);
                ctx.body={"code":200,"message":"ok",data:[]};
            }catch (e){
                ctx.body={"code":500,"message":"添加mygoods错误！"+e.message,data:[]};
            }
    }
}