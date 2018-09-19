const postcardDAO = require('../model/postcardDAO');
module.exports = {
    //index--明信片实时动态-收到最新动态
    getNewReceive:async (ctx, next) =>{
        try {
            let newRecevie= await postcardDAO.getNewReceive();
            ctx.body = {"code": 200, "message": "ok:最新实时收到动态", data: newRecevie};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误",};
        }
    },
    //index--明信片实时动态：发送最新动态
    getNewSend:async(ctx,next) =>{
        try {
            let NewSend = await postcardDAO.getNewSend();
            ctx.body = {"code": 200, "message": "ok，最新实时发送动态", data: NewSend};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误",};
        }
    },
    //index--明信片收发实时动态
    realtimeDynamic:async(ctx,next)=>{
        try {
            let NewSend = await postcardDAO.getNewSend();
            let NewReceive = await postcardDAO.getNewReceive();
            let realtimeDynamic = {
                newSend:NewSend,
                newReceive:NewReceive
            }
            ctx.body = {"code": 200, "message": "ok，明信片收发实时动态", data: realtimeDynamic};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误",data:[]};
        }
    },
    //index--获取最新发布的明信片信息
    getTenRecentPostcard:async(ctx,next)=>{
        try{
           let rencentPostcard = await postcardDAO.getTenRecentPostcard()
           ctx.body = {"code":200,"message":"最新明信片展示",data:rencentPostcard}
        }catch(e){
            ctx.body = {"code":500,"message":"服务器错误"+e.toString(),data:[]}
        }

    },



    //wall--查询所有的明信片
    getAllCard:async (ctx,next)=>{
        try{
            let all=await postcardDAO.getAllCard();
            console.log(all)
            ctx.body = {'code': 200, "message": "ok", data: all};
        }catch (e){
            ctx.body = {'code': 500, "message": "没有查到明信片！！", data:[]};
        }

    },
    //wall--根据输入的省份查询明信片
    getPostCard:async (ctx,next)=> {
        console.log(ctx.params.city)
        // console.log(ctx.query)
        try{
            let jsondata = await postcardDAO.getPostCard(ctx.params.city);
            ctx.body = {'code': 200, "message": "ok", data: jsondata};
        }catch (e){
            ctx.body = {'code': 500, "message": "服务器错误！", data:[]};
        }
    },
    //wall--根据所选的具体页面来显示具体页面的照片墙
    getPage:async (ctx,next)=>{
        try{
            let jsondata = await postcardDAO.getPage(ctx.params.page);
            console.log(ctx.params.page);
            console.log(jsondata)
            ctx.body = {'code': 200, "message": "ok", data: jsondata};
        }catch (e){
            ctx.body = {'code': 500, "message": "服务器错误！", data:[]};
        }
    },

    //postcard--点击照片墙上的照，显示明信片详情界面
    getCardInformation:async (ctx,next)=>{
        try{
            console.log(ctx.params.cardId);
            let cardInformation=await postcardDAO.getCardInformation(ctx.params.cardId);
            let cardComment=await postcardDAO.getComment(ctx.params.cardId);
            let content = {
                cardInformation:cardInformation,
                cardComment:cardComment
            };
            ctx.body = {'code': 200, "message": "ok", data: content};
        }catch (e){
            ctx.body = {'code': 500, "message": "点击明信片没查到信息！", data:[]};
        }
    },
    //postcard--添加评论
    addComment:async (ctx,next)=>{
        try{
            let userId=ctx.request.body.commentUserId;
            let cardId=ctx.request.body.commentCardId;
            let commentContent=ctx.request.body.commentContent;
            let commentTime=new Date;
            console.log(commentTime)
            let form={
                commentUserId:userId,
                commentCardId:cardId,
                commentContent:commentContent,
                commentTime:commentTime
            };
            let all=await postcardDAO.addComment(form);
            console.log(all)
            ctx.body = {'code': 200, "message": "ok", data: all};
        }catch (e){
            ctx.body = {'code': 500, "message": "postcard里评论失败！"+e.message, data:[]};
        }
    },
    //postcard--用户点赞，点赞数加1
    addLike:async (ctx,next)=>{
        try{
            let likeNum=await postcardDAO.addLike(ctx.params.cardId);
            ctx.body={'code':200,"message":"ok",data:likeNum};
        }catch (e){
            ctx.body={'code':500,"message":"点赞加1！嘿嘿报错了！"+e.message,data:[]};
        }
    },
    //postcard--用户取消点赞，点赞数减1
    unLike:async (ctx,next)=>{
        try{
            let likeNum=await postcardDAO.unLike(ctx.params.cardId);
            ctx.body={'code':200,"message":"ok",data:likeNum};
        }catch (e){
            ctx.body={'code':500,"message":"点赞加1！嘿嘿报错了！"+e.message,data:[]};
        }
    },
    //根据输入明信片的id，更新postcard中明信片的照片
    uploadPic:async (ctx,next)=>{
        try{
            await postcardDAO.uploadPic(ctx.params.cardPic,ctx.params.cardId);
            ctx.body={'code':200,"message":"ok",data:[]};
        }catch (e){
            ctx.body={'code':500,"message":"err"+e.message,data:[]};
        }
    },
    //根据输入明信片的id,更新postcad中明信片的接收时间
    upReceiveTime:async (ctx,next)=>{
        try{
            await postcardDAO.upReceiveTime(ctx.params.cardId);
            ctx.body={'code':200,"message":"ok",data:[]};
        }catch (e){
            ctx.body={'code':500,"message":"err"+e.message,data:[]};
        }
    }
};