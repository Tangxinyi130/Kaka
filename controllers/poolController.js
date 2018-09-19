var poolDAO = require("../model/poolDAO")
module.exports = {
    //获得接受方信息和cardId
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
    //向明信片卡里面插入抽到的明信片的id,和接收方以及发送方的一些基本信息
    sendPostcard: async (ctx, next) => {
        try {
            await poolDAO.sendPostcard(ctx.params.userId);
            ctx.body = {"code": 200, "message": 'ok', data: []}
             } catch (err) {
            ctx.body = {"code": 200, "message": err.message, data: []}
        }
    }
}