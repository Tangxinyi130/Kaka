var poolDAO = require("../model/poolDAO")
module.exports = {
    //获取在最先抽取池里日期最小的用户的基本信息
    getReceiveMessage: async (ctx, next) => {
        try {
            let ReceiveMessage = await poolDAO.getReceiveMessage();
            ctx.body = {"code": 200, "message": 'ok', data: ReceiveMessage[0]}
        } catch (err) {
            ctx.body = {
                "code": 200,
                "message": '服务器错误',
                data: []

            }
        }
    }
    ,
    //获取在最先抽取池里日期最小的用户的id
    getUserId: async (ctx, next) => {
        try {
            let userId = await poolDAO.getUserId();
            let cardReceiver = userId[0].poolUserId;
            ctx.body = {"code": 200, "message": 'ok', data: cardReceiver}
        } catch (err) {
            ctx.body = {
                "code": 200,
                "message": '服务器错误',
                data: []

            }
        }
    }
    ,
    //得到被抽到用户的地区
    getCardReceiveRegion: async (ctx, next) => {
        try {
            let cardReceiveRegion = await poolDAO.getCardReceiveRegion();
            console.log(cardReceiveRegion)
            ctx.body = {"code": 200, "message": 'ok', data: cardReceiveRegion[0].userProvince}

        } catch (err) {
            ctx.body = {
                "code": 200,
                "message": '服务器错误',
                data: []

            }
        }
    },
    // 得到发送用户的地区
    getCardSendRegion: async (ctx, next) => {
        try {
            let cardSendRegion = await poolDAO.getCardSendRegion(ctx.params.userId);
            ctx.body = {"code": 200, "message": 'ok', data: cardSendRegion[0].userProvince}
        } catch (err) {
            ctx.body = {
                "code": 200,
                "message": err.toString(),
                data: []

            }
        }
    }
    ,
    //得到当前发送用户的地区明信片的编号加一
    updateRegion: async (ctx, next) => {
        try {
            await poolDAO.updataRegion(ctx.params.userId);
            ctx.body = {"code": 200, "message": 'ok', data: []}

        } catch (err) {
            ctx.body = {
                "code": 200,
                "message": '服务器错误',
                data: []

            }
        }
    }

    ,
    // 查询当前用户地区明信片编号和数量
    getRegion: async (ctx, next) => {
        try {
            let region = await poolDAO.getRegion(ctx.params.userId);
            ctx.body = {"code": 200, "message": 'ok', data: region}
        } catch (err) {
            ctx.body = {
                "code": 200,
                "message": '服务器错误',
                data: []
            }
        }
    },


    //根据获得地区明信片的编号和数量形成明信片的卡的id
    setCarId: async (ctx, next) => {
        try {
            let cardId = await poolDAO.setCardId(ctx.params.userId);
            ctx.body = {"code": 200, "message": 'ok', data: cardId[0].cardId}

        } catch (err) {
            ctx.body = {
                "code": 200,
                "message": '服务器错误',
                data: []

            }
        }
    },
    insertPostcard: async (ctx, next) => {
        try {
            await poolDAO.updataRegion(ctx.params.userId);
            let cardId = await poolDAO.setCardId(ctx.params.userId);
            // console.log(cardId[0].cardId);
            let cardId1 = cardId[0].cardId;

            let userId = await poolDAO.getUserId();
            let cardReceiver = userId[0].poolUserId;

            let cardReceiveRegion = await poolDAO.getCardReceiveRegion();
            let cardSendRegion = await poolDAO.getCardSendRegion(ctx.params.userId);
            let postCard = {};
            postCard.cardId = cardId1,
                postCard.cardSender = ctx.params.userId,
                postCard.cardReceiver = cardReceiver,
                postCard.cardSendRegion = cardSendRegion[0].userProvince,
                postCard.cardReceiveRegion = cardReceiveRegion[0].userProvince,
                await poolDAO.insertPostcard(postCard)
            ctx.body = {"code": 200, "message": 'ok', data: []}


        } catch (err) {
            ctx.body = {"code": 200, "message": err.message, data: []}
        }
    },
    getMessage: async (ctx, next) => {
        try {

            let cardId = await poolDAO.setCardId(ctx.params.userId);
            let cardId1 = cardId[0].cardId;

            let userId = await poolDAO.getUserId();
            let cardReceiver = userId[0].poolUserId;

            let cardReceiveRegion = await poolDAO.getCardReceiveRegion();
            let ReceiveMessage = await poolDAO.getReceiveMessage();
            let ReceiveMessage1 = ReceiveMessage[0];

            let receiveMessage = {};
            receiveMessage.cardId = cardId1,
                receiveMessage.cardReceiver = cardReceiver,
                receiveMessage.cardReceiveRegion = cardReceiveRegion[0].userProvince, receiveMessage.userNickname = ReceiveMessage1.userNickname,
                receiveMessage.userSex = ReceiveMessage1.userSex,
                receiveMessage.userEmail = ReceiveMessage1.userEmail,
                receiveMessage.userHeadPic = ReceiveMessage1.userHeadPic,
                receiveMessage.userBirthday = ReceiveMessage1.userBirthday,
                receiveMessage.userProvince = ReceiveMessage1.userProvince,
                receiveMessage.userCity = ReceiveMessage1.userCity,


                ctx.body = {"code": 200, "message": 'ok', data: receiveMessage}


        } catch (err) {
            ctx.body = {"code": 200, "message": err.message, data: []}
        }
    },
    //查寻时间最小的poolTime
    selMinTime: async (ctx, next) => {
        try {
           let mintime= await poolDAO.selMinTime();
            ctx.body = {"code": 200, "message": 'ok', data: mintime[0].poolTime}

        } catch (err) {
            ctx.body = {
                "code": 200,
                "message": '服务器错误',
                data: []

            }
        }
    },
    //把接收方方从pool池里面删除
    delectReceive: async (ctx, next) => {
        try {
            let mintime= await poolDAO.selMinTime();
            let mintime1=mintime[0].poolTime;
            console.log(mintime1)
            await poolDAO.delectReceive(mintime1);
            ctx.body = {"code": 200, "message": 'ok', data:[]}

        } catch (err) {
            ctx.body = {
                "code": 200,
                "message": '服务器错误',
                data: []

            }
        }
    },
    //把发送方添加到pool池里
    insertSend: async (ctx, next) => {
        try {
            await poolDAO.insertSend(ctx.params.userId);
            ctx.body = {"code": 200, "message": 'ok', data:[]}

        } catch (err) {
            ctx.body = {
                "code": 200,
                "message": '服务器错误',
                data: []

            }
        }
    }

}