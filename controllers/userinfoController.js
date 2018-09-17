const userDAO = require("../model/userinfoDAO");
module.exports = {
    //users === 查询指定用户
    getOneUser: async (ctx, next) => {
        try {
            let jsondata = await userDAO.getOneUser(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data:jsondata[0]};
        } catch(e) {
            ctx.body = {"code": 500, "message": "服务器错误", data:[]};
        }
    },
    //users === 用户简介
    getUserSynopsis: async (ctx, next) => {
        try {
            //用户个人信息
            let userDate = await userDAO.getOneUser(ctx.params.userId);
            //用户关注数
            let userAttentionNum = await userDAO.countAttentionNum(ctx.params.userId);
            //用户粉丝数
            let userFansNum = await userDAO.countFansNum(ctx.params.userId);
            let synopsis = {
                userName: userDate[0].userName, //用户姓名
                userId: userDate[0].userId, //用户id
                userHeadPic: userDate[0].userHeadPic,   //用户头像
                userSex: userDate[0].userSex,   //用户性别
                userBirthday: userDate[0].userBirthday,  //用户生日
                userAttentionNum: userAttentionNum[0].attentionNum, //用户关注数
                userFansNum: userFansNum[0].fanNum  //用户粉丝数
            };
            ctx.body = {"code": 200, "message": "ok", data:synopsis};
        } catch(e) {
            ctx.body = {"code": 500, "message": "服务器错误", data:[]};
        }
    },
    //users === 用户详细信息
    getUserIntroduction: async (ctx, next) => {
        try {
            //寄出的明信片数量
            let userSendNum = await userDAO.countSendNum(ctx.params.userId);
            //收到的明信片数量
            let userReceiveNum = await userDAO.countReceiveNum(ctx.params.userId);
            //所寄出的明信片经过的距离
            let userSendDistance = await userDAO.countDistance(ctx.params.userId);
            //加入网站的天数
            let userJoinTime = await userDAO.countJoinTime(ctx.params.userId);
            let introduction = {
                userSendNum: userSendNum[0].sendNum,    //寄出的明信片数量
                userReceiveNum: userReceiveNum[0].receiveNum,   //收到的明信片数量
                userSendDistance: userSendDistance[0].distanceNum,  //所寄出的明信片经过的距离
                userJoinTime: userJoinTime[0].joinTime  //加入网站的天数
            };
            ctx.body = {"code": 200, "message": "ok", data:introduction};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误", data:[]};
        }
    },
    //users === 关于我的
    showAboutUser: async (ctx, next) => {
        try {
            //用户个人信息
            let userDate = await userDAO.getOneUser(ctx.params.userId);
            //"关于我的"信息
            let aboutUser = [{userAboutMe: userDate[0].userAboutMe}];
            ctx.body = {"code": 200, "message": "ok", data:aboutUser};
        } catch(e) {
            ctx.body = {"code": 500, "message": "服务器错误", data:[]};
        }
    },
    //users === 修改关于我的
    updateAboutMe: async (ctx, next) => {
        try {
            await userDAO.updateAboutMe(ctx.request.body.userId, ctx.request.body.newAboutMe);
            ctx.body = {"code": 200, "message": "ok", data:[]};
        } catch(e) {
            ctx.body = {"code": 500, "message": "服务器错误", data:[]};
        }
    },
    //users === 已发送的明信片
    getUserSend: async (ctx, next) => {
        try {
            let userSend = await userDAO.getUserSend(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data:userSend};
        } catch(e) {
            ctx.body = {"code": 500, "message": "服务器错误", data:[]};
        }
    },

    //index--首页-用户部分数据卡片数据
    getUserCard:async(ctx,next)=>{
        try {
            //用户头像
            let headPic = await userDAO.getUserHeadPic(ctx.params.userId);
            //用户昵称
            let nickName = await userDAO.getUserNickName(ctx.params.userId);
            //用户发送总数
            let sendNum = await userDAO.countSendNum(ctx.params.userId);
            //用户收到总数
            let receiveNum =await userDAO.countReceiveNum(ctx.params.userId);
            //我的关注数
            let attentionNum = await userDAO.countAttentionNum(ctx.params.userId);
            //我的粉丝数
            let fansNum = await userDAO.countFansNum(ctx.params.userId);
            //我的收藏数
            let collectionNum = await userDAO.countCollectionNum(ctx.params.userId);
            // 用户卡全部信息
            let UserCard = {
                headPic:headPic,
                nickName:nickName,
                sendNum:sendNum,
                receiveNum:receiveNum,
                attentionNum:attentionNum,
                fansNum:fansNum,
                collectionNum:collectionNum
            }
            ctx.body = {"code": 200, "message": "ok", data:UserCard};
        } catch(e) {
            ctx.body = {"code": 500, "message": "服务器错误"+e.toString(), data:[]};
        }
    },
    //index--首页-限制发送数量的进度条【可发送总数】【未确认接收数】
    statusBar:async(ctx,next)=>{
        try{
            //用户已经发送但未确认收获总数
            let unabsorbedNum = await userDAO.getUnabsorbedNum(ctx.params.userId);
            //用户一共可以发送未确认的总数
            let transmitsNum = 5;
            //可发送数量占比
            let proportion = (transmitsNum-unabsorbedNum[0].unabsorbedNum);
            let statusBar ={
                transmitsNum:transmitsNum,
                unabsorbedNum:unabsorbedNum,
                proportion:proportion
            }
            ctx.body = {"code": 200, "message": "用户的可发送数和以发送数", data:statusBar};
        } catch(e) {
            ctx.body = {"code": 500, "message": "服务器错误"+e.toString(), data:[]};
         }
    }
};