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
            let realtimeDynamic = await postcardDAO.getDynamic();
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
            let allPicture=await postcardDAO.getAllCard();
            let allCity=await postcardDAO.getAllCity();
            let all={
                allPicture:allPicture,
                allCity:allCity
            }
            console.log(all)
            ctx.body = {'code': 200, "message": "ok", data: all};
        }catch (e){
            ctx.body = {'code': 500, "message": "没有查到明信片！！", data:[]};
        }

    },
    //根据城市页数查找
    getCityPage:async (ctx,next)=>{
      try{
          let city=ctx.params.city;
          let page=ctx.params.page;
          let data={
              city:city,
              page:page
          }
          let jsondata = await postcardDAO.getCityPage(data);
          ctx.body = {'code': 200, "message": "ok", data: jsondata};
      }catch (e) {
          ctx.body = {'code': 500, "message": "城市和页数错！", data:[]};
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
            const form1={
                commentUserId:userId,
                commentCardId:cardId,
                commentContent:commentContent,
                commentTime:commentTime
            };
            let all=await postcardDAO.addComment(form1);
            ctx.body = {'code': 200, "message": "ok", data: all};
        }catch (e){
            ctx.body = {'code': 500, "message": "postcard里评论失败！"+e.message, data:all};
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
    //postcard === 地图上显示发送方和收取方两地
    showPath: async (ctx, next) => {
        try {
            let path = await postcardDAO.showPath(ctx.params.sendUserId, ctx.params.receiveUserId);
            ctx.body = {"code": 200, "message": "ok", data: path};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
        }
    },


    //receive --- 根据输入明信片的id，更新postcard中明信片的照片
    uploadPic:async (ctx,next)=>{
        try{
            await postcardDAO.uploadPic(ctx.params.cardPic,ctx.params.cardId);
            ctx.body={'code':200,"message":"ok",data:[]};
        }catch (e){
            ctx.body={'code':500,"message":"err"+e.message,data:[]};
        }
    },
    //receive --- 实现接收功能,更新了postcard里的接收时间和把发送方添加到池里面
    receive:async (ctx,next)=>{
        try{
            //查看所输入的明信片在数据库中是否存在
            let rpc= await postcardDAO.exist(ctx.params.cardId,ctx.params.userId);
            let rpc1=rpc[0];
            console.log(rpc1.sum);
            let t= {};
            t.receivecards=rpc1.sum;
            if(rpc1.sum>0){
                await postcardDAO.receive(ctx.params.cardId);
                ctx.body={'code':200,"message":"ok",data:t};
            }else {
                ctx.body={'code':200,"message":"ok",data:t};
            }
            //进行接收操作

        }catch (e){
            ctx.body={'code':500,"message":"err"+e.message,data:[]};
        }
    },

    //receive === 提供两个用户的地址，由前端进行距离计算
    calculateDistance: async (ctx, next) => {
        try {
            let path1 = await postcardDAO.showPath1(ctx.params.sendUserId);
            let path2 = await postcardDAO.showPath2(ctx.params.receiveUserId);
            let path = [path1[0], path2[0]];
            ctx.body = {"code": 200, "message": "ok", data: path};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
        }
    },

    //receive === 获取前端计算完成的距离，插入对应的明信片信息中
    updateDistance: async (ctx, next) => {
        try {
            await postcardDAO.updateDistance(ctx.params.distance, ctx.params.cardId);
            ctx.body = {"code": 200, "message": "ok", data: []};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
        }
    }
};