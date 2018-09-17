const attentionDAO = require("../model/attentionDAO");
const userDAO = require("../model/userinfoDAO");
module.exports = {
    //users === 我的粉丝和我的关注(用户的头像和关注数量和粉丝数量)
    getAttention: async (ctx, next) => {
        try {
            //用户个人信息
            let userDate = await userDAO.getOneUser(ctx.params.userId);
            //用户关注数
            let userAttentionNum = await userDAO.countAttentionNum(ctx.params.userId);
            //用户粉丝数
            let userFansNum = await userDAO.countFansNum(ctx.params.userId);
            //我的粉丝与关注(用户个人信息)
            let userAttention = {
                userNickname: userDate[0].userNickname, //用户姓名
                userId: userDate[0].userId, //用户id
                userHeadPic: userDate[0].userHeadPic,   //用户头像
                userAttentionNum: userAttentionNum[0].attentionNum, //用户关注数
                userFansNum: userFansNum[0].fanNum  //用户粉丝数
            };
            ctx.body = {"code": 200, "message": "ok", data:userAttention};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 关注用户的信息简介
    getAttentionSynopsis: async (ctx, next) => {
        try {
            let attentionSynopsis = await attentionDAO.getAttentionSynopsis(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data:attentionSynopsis};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 粉丝用户的信息简介(isAttention表示用户是否互关，显示不同的按钮)
    getFansSynopsis: async (ctx, next) => {
        try {
            let fansSynopsis = await attentionDAO.getFansSynopsis(ctx.params.userId);
            //查询attention表
            let attention = await attentionDAO.getAttention();
            //添加isAttention，判断用户是否互关
            let attentionLength = attention.length;
            for (let i = 0; i < attentionLength; i++) {
                attention[i].isAttention = false;
                for (let j = 0; j < attentionLength; j++) {
                    //attentionFan和attentionName相互交换，判断是否在attention表中存在
                    if (attention[i].attentionName == attention[j].attentionFan && attention[i].attentionFan == attention[j].attentionName) {
                        attention[i].isAttention = true;
                    }
                }
            }
            let fansSynopsisLength = fansSynopsis.length;
            //将对应的用户粉丝的信息查出后，将查询出的用户与处理过的attention记录进行判断，添加对应的isAttention属性
            for (let i = 0; i < fansSynopsisLength; i++) {
                for (let j = 0; j < attentionLength; j++) {
                    if (fansSynopsis[i].userId == attention[j].attentionFan) {
                        fansSynopsis[i].isAttention = attention[j].isAttention;
                    }
                }
            }
            ctx.body = {"code": 200, "message": "ok", data:fansSynopsis};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 搜索用户
    getUser: async (ctx, next) => {
        try {
            let users = await attentionDAO.getUser(ctx.params.searchUser);
            let usersLength = users.length;
            //查询attention表
            let attention = await attentionDAO.getAttention();
            let attentionLength = attention.length;
            //判断查询出的用户和登录者的关注关系
            for (let i = 0; i < usersLength; i++) {
                users[i].isAttention = false;
                //判断查询出的用户是否为自己，是自己时isMy = true
                if (users[i].userId == ctx.params.userId) {
                    users[i].isMy = true;
                }
                for (let j = 0; j < attentionLength; j++) {
                    //判断自己是否关注查询出的用户
                    if (users[i].userId == attention[j].attentionName && attention[j].attentionFan == ctx.params.userId) {
                        users[i].isAttention = true;
                    }
                }
            }
            ctx.body = {"code": 200, "message": "ok", data:users};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 关注用户
    insertAttention: async (ctx, next) => {
        try {
            await attentionDAO.insertAttention(ctx.params.userId, ctx.params.otherId);
            ctx.body = {"code": 200, "message": "ok", data:[]};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    }
};