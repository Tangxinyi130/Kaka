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
            //页面显示的用户的关注情况
            let attentionSynopsis = await attentionDAO.getAttentionSynopsis(ctx.params.userId);
            //登录的用户的关注情况
            let loginAttention = await attentionDAO.getAttentionSynopsis(ctx.params.loginId);

            let attentionLength = attentionSynopsis.length;
            let loginAttentionLength = loginAttention.length;
            for (let i = 0; i < attentionLength; i++) {
                attentionSynopsis[i].isAttention = false;
                for (let j = 0; j < loginAttentionLength; j++) {
                    if (attentionSynopsis[i].userId == loginAttention[j].userId) {
                        attentionSynopsis[i].isAttention = true;
                    }
                }
            }
            ctx.body = {"code": 200, "message": "ok", data:attentionSynopsis};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 粉丝用户的信息简介(isAttention表示用户是否互关，显示不同的按钮)
    getFansSynopsis: async (ctx, next) => {
        try {
            /**
             * 1.获取页面显示的用户的粉丝情况（按钮未定，仅获取该用户的粉丝信息）
             * 2.获取登录用户的关注者信息
             * 3.判断页面显示用户的粉丝是否是登陆的用户的关注者，添加isAttention，确定按钮是“关注”或“取消关注”
             *
             * ctx.params.userId: 页面显示的用户id
             * ctx.params.loginId: 登录的用户id
             *
             */
            //页面显示的用户的粉丝情况
            let fansSynopsis = await attentionDAO.getFansSynopsis(ctx.params.userId);
            //登录的用户的粉丝情况
            let loginAttention = await attentionDAO.getAttentionSynopsis(ctx.params.loginId);

            /**
             * 现在判断用户是否关注，从loginAttention中的用户直接判断，attentionFan是loginId，attentionName是loginAttention中查出的用户
             * fansSynopsis中的用户是否是loginAttention中的用户，若是，则isAttention为true， 若不是，则isAttention为false
             */

            let loginAttentionLength = loginAttention.length;
            let fansSynopsisLength = fansSynopsis.length;
            for (let i = 0; i < fansSynopsisLength; i++) {
                fansSynopsis[i].isAttention = false;
                for (let j = 0; j < loginAttentionLength; j++) {
                    if (fansSynopsis[i].userId == loginAttention[j].userId) {
                        fansSynopsis[i].isAttention = true;
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
    },
    //users === 取消关注
    deleteAttention: async (ctx, next) => {
        try {
            await attentionDAO.deleteAttention(ctx.params.userId, ctx.params.otherId);
            ctx.body = {"code": 200, "message": "ok", data:[]};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 关注者收件数排行榜
    showAttentionList: async (ctx, next) => {
        try {
            let attentionList = await attentionDAO.showAttentionList(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data:attentionList};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //postcards === 判断登录者是否关注该用户
    isAttention: async (ctx, next) => {
        try {
            console.log("id:  " + ctx.params.loginId);
            console.log("otherid:  " + ctx.params.otherId)
            let select = await attentionDAO.isAttention(ctx.params.loginId, ctx.params.otherId);
            console.log("select:  " + select[0].sum);
            ctx.body = {"code": 200, "message": "ok", data:select[0]};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    }

};