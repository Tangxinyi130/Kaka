const collectionDAO=require('../model/collectionDAO');
const postcardDAO = require('../model/postcardDAO');
module.exports={
    getCollectionNumber:async (ctx,next)=>{
        try{
            let collectionNumber=await collectionDAO.getCollectionNumber(ctx.params.cardId);
            let likeNum=await postcardDAO.addLike(ctx.params.cardId);
            let number={
                collectionNumber:collectionNumber,
                likeNum:likeNum
            };
            ctx.body={"code":200,"message":"ok",data:number};
        }catch (e){
            ctx.body={"code":500,"message":"明信片被收藏数量！",data:[]};
        }
    }
};