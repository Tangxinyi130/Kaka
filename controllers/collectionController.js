const collectionDAO=require('../model/collectionDAO');
module.exports={
    getCollectionNumber:async (ctx,next)=>{
        try{
            let collectionNumber=await collectionDAO.getCollectionNumber(ctx.params.cardId);
            ctx.body={"code":200,"message":"ok",data:collectionNumber};
        }catch (e){
            ctx.body={"code":500,"message":"明信片被收藏数量！",data:[]};
        }
    }
};