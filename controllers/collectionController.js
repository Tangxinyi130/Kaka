const collectionDAO=require('../model/collectionDAO');
const postcardDAO = require('../model/postcardDAO');
module.exports={
    //postcard--查询这张明信片的被收藏，被评论数
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
    },
    //postcard--插入被收藏的明信片信息
    insertCollection:async (ctx,next)=>{
        try{
            const userId=11;
            let cardId=ctx.params.cardId;
            let insertData={
                userId:userId,
                cardId:cardId
            };
            let cardCollect= await collectionDAO.insertCollection(insertData);
            ctx.body={"code":200,"message":"ok",data:cardCollect};
        }catch (e){
            ctx.body={"code":500,"message":"插入收藏的数据！",data:[]};
        }
    },
    //postcard--删除取消收藏的明信片信息
    deleteCollection:async (ctx,next)=>{
        try{
            const userId=11;
            let cardId=ctx.params.cardId;
            let insertData={
                userId:userId,
                cardId:cardId
            };
            let cardCollect= await collectionDAO.deleteCollection(insertData);
            ctx.body={"code":200,"message":"ok",data:cardCollect};
        }catch (e){
            ctx.body={"code":500,"message":"删除收藏的数据！",data:[]};
        }
    }
};