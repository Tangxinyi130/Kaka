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
            ctx.body = {"code": 500, "message": "服务器错误",};
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
    }

};