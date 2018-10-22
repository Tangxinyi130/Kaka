const userDAO = require("../model/userinfoDAO");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const multer = require('koa-multer');//加载koa-multer模块


module.exports = {
    //users === 查询指定用户
    getOneUser: async (ctx, next) => {
        try {
            let jsondata = await userDAO.getOneUser(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data:jsondata[0]};
        } catch(e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
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
                userNickname: userDate[0].userNickname, //用户姓名
                userId: userDate[0].userId, //用户id
                userHeadPic: userDate[0].userHeadPic,   //用户头像
                userSex: userDate[0].userSex,   //用户性别
                userBirthday: userDate[0].userBirthday,  //用户生日
                userAttentionNum: userAttentionNum[0].attentionNum, //用户关注数
                userFansNum: userFansNum[0].fanNum  //用户粉丝数
            };
            ctx.body = {"code": 200, "message": "ok", data:synopsis};
        } catch(e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
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
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 关于我的
    showAboutUser: async (ctx, next) => {
        try {
            //用户个人信息
            let userDate = await userDAO.getOneUser(ctx.params.userId);
            //"关于我的"信息
            let aboutUser = {userAboutMe: userDate[0].userAboutMe};
            ctx.body = {"code": 200, "message": "ok", data:aboutUser};
        } catch(e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 修改关于我的
    updateAboutMe: async (ctx, next) => {
        try {
            await userDAO.updateAboutMe(ctx.request.body.userId, ctx.request.body.newAboutMe);
            ctx.body = {"code": 200, "message": "ok", data:[]};
        } catch(e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 已发送的明信片
    getUserSend: async (ctx, next) => {
        try {
            let userSend = await userDAO.getUserSend(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data:userSend};
        } catch(e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 已收到的明信片
    getUserReceive: async (ctx, next) => {
        try {
            let userReceive = await userDAO.getUserReceive(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data:userReceive};
        } catch(e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 查看明信片图片
    getCardPic: async (ctx, next) => {
        try {
            let card = await userDAO.getCardPic(ctx.params.postcardId);
            ctx.body = {"code": 200, "message": "ok", data:card[0]};
        } catch(e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 上传明信片图片
    updateCardPic: async (ctx, next) => {
        try {
            await userDAO.updateCardPic(ctx.request.body.userId, ctx.request.body.cardId, ctx.request.body.cardUrl);
            ctx.body = {"code": 200, "message": "ok", data:[]};
        } catch(e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 用户的明信片墙，查询收到的明信片图片
    showUserReceivePic: async (ctx, next) => {
        try {
            let wallReceivePic = await userDAO.showUserReceivePic(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data:wallReceivePic};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 用户的明信片墙，查询发送的明信片图片
    showUserSendPic: async (ctx, next) => {
        try {
            let wallSendPic = await userDAO.showUserSendPic(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data:wallSendPic};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 用户的明信片墙，查询收藏的明信片图片
    showUserCollectionPic: async (ctx, next) => {
        try {
            let wallCollectPic = await userDAO.showUserCollectionPic(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data:wallCollectPic};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },
    //users === 地区排行榜
    showMapCharts: async (ctx, next) => {
        try {
            let mapCharts = await userDAO.showMapCharts(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data: mapCharts};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
        }
    },
    //users === 我的活动(我的商品)
    showMyActivity: async (ctx, next) => {
        try {
            let myActivity = await userDAO.showMyActivity(ctx.params.userId);
            console.log("个人活动的信息"+myActivity);
            ctx.body = {"code": 200, "message": "ok", data: myActivity};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
        }
    },
    //users === 确认收货
    receivedGoods: async (ctx, next) => {
        try {
            await userDAO.receivedGoods(ctx.params.mygoodsId, ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data: []};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
        }
    },
    //users === 查询明信片
    searchCard: async (ctx, next) => {
        try {
            let cards = await userDAO.searchCard(ctx.request.body.userId, ctx.request.body.province);
            ctx.body = {"code": 200, "message": "ok", data: cards};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
        }
    },
    //users === 设置用户
    setUsers: async (ctx, next) => {
        try {
            console.log(ctx.request.body.userName);
            console.log(ctx.request.body.userPwd),
            console.log(ctx.request.body.userNickname),
            console.log(ctx.request.body.userSex),
            console.log(ctx.request.body.userEmail),
            console.log(ctx.request.body.userBirthday.substring(0, 10)),
            console.log(ctx.request.body.userProvince),
            console.log(ctx.request.body.userCity),
            console.log(ctx.request.body.userPostcode),
            console.log(ctx.request.body.userAddress),
            console.log(ctx.request.body.userId)
            await userDAO.setUsers(
                ctx.request.body.userName,
                ctx.request.body.userPwd,
                ctx.request.body.userNickname,
                ctx.request.body.userSex,
                ctx.request.body.userEmail,
                ctx.request.body.userBirthday.substring(0, 10),
                ctx.request.body.userProvince,
                ctx.request.body.userCity,
                ctx.request.body.userPostcode,
                ctx.request.body.userAddress,
                ctx.request.body.userId
            );
            // console.log("进行了设置")

            let user = await userDAO.getOneUser(ctx.request.body.userId);
            ctx.body = {"code": 200, "message": "ok", data: user};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
        }
    },
    //users === 用户个人地图的显示
    showUserMap: async (ctx, next) => {
        try {
            let address = await userDAO.showUserMap(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data: address[0]};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
        }
    },
    //users === 地图板块的点亮部分，返回所有有明信片的地区和对应该地区的数量
    showMapCollection: async (ctx, next) => {
        try {
            let collection = await userDAO.showMapCollection(ctx.params.userId);
            ctx.body = {"code": 200, "message": "ok", data: collection};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
        }
    },

    //users === 设置用户头像
    setUserHeadPic: async (ctx, next) => {
        try {
            let src = "http://localhost:3000/headpics/" + ctx.req.file.filename;
            await userDAO.setUserHeadPic(src, ctx.req.body.id);
            ctx.body = {"code": 200, "message": "ok", data: []};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data: []};
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
    },
    //index--首页--用户收件排行榜信息
    getSendRanking:async(ctx,next)=>{
        try{
            let sendRanking = await userDAO.getSendRanking();
            ctx.body={"code":200,"message":"ok排行榜信息：",data:sendRanking}
        }catch(e){
            ctx.body = {"code":500,"message":"服务器错误"+e.toString(),data:[]}
        }
    },
    //登录
    doLogin:async(ctx,next)=>{
        try {
            /*
            * 登录验证返回数据
            *  userUnExsit:false,   用户名是否存在，默认存在
               loginSucess:false,   登录是否成功，默认不成功
               passwordWrong:false, 密码是否错误，默认正确
            * */
            let data = {
                userUnExsit:false,
                loginSucess:false,
                passwordWrong:false,
            };

            let {username, password} = ctx.request.body;
            let Name = await userDAO.doLogin(username);
            // console.log(Name);

            if (Name == "") {
                data.userUnExsit = true;
                // console.log("用户名错误")
                ctx.body = {"code": 200, "message": "ok", data: 1}

                // ctx.body = '用户名不存在';
            }
            else if (Name[0].userTel=== username) {
                let Pwd = await  userDAO.userPw(username);
                // console.log('数据库里的密码：'+Pwd[0].userPwd);
                // console.log(adminPwd[0].managerPwd);
                if (await  Pwd[0].userPwd === password) {
                    data.loginSucess = true;

                    //=======================
                    console.log("已运行")
                    let loginUser = await userDAO.getLoginUser(username);
                    ctx.session.user = loginUser[0];
                    console.log(loginUser[0]);

                    // console.log(ctx.session.user);
                    ctx.body = {"code": 200, "message": "ok", data: 3}
                    //=======================

                    // ctx.body = '登陆成功';
                } else {
                    data.passwordWrong = true;
                    // console.log("密码错误")
                    ctx.body = {"code": 200, "message": "ok", data: 2}
                    // ctx.body = '密码错误';
                }
            }
            // ctx.body = {"code": 200, "message": "ok", data: data}
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }

    },

    //根据手机号查询登录的用户id
    getUserId:async (ctx, next) => {
        try {
            let id = await userDAO.getUserId(ctx.request.body.userTel);
            console.log("myId: " + id[0].userId);
            ctx.body = {"code": 200, "message": "ok", data: id[0]};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    },


    //根据明信片查看收发用户id
    getTwoUser: async (ctx, next) => {
        try {
            let user = await userDAO.getTwoUser(ctx.params.cardId);
            ctx.body = {"code": 200, "message": "ok", data: user[0]};
        } catch (e) {
            ctx.body = {"code": 500, "message": e.toString(), data:[]};
        }
    }
};