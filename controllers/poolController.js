var poolDAO = require("../model/poolDAO")
module.exports = {
    //完成发送功能，返回接收方一些基本信息和发送的明信片信息
    sendPostcard: async (ctx, next) => {
        try {
            let count= await poolDAO.limitCount(ctx.params.userId);
            let count1=count[0];
            console.log(count1.sum);
            if(count1.sum<5){
            let message= await poolDAO.sendPostcard(ctx.params.userId);
            let  mes=message[0];
            let ms=mes[0];
            let receiveMessage = {};
            receiveMessage.cardReceiver = ms.p_cardReceive,
              receiveMessage.userNickname =ms.p_cardReceiveNickname,
                receiveMessage.userSex = ms.p_cardReceiveSex,
                receiveMessage.userEmail =ms.p_cardReceiveEmail,
                receiveMessage.userHeadPic =ms.p_cardReceiveHeadPic,
                receiveMessage.userBirthday =ms.p_cardReceiveBirthday,
                receiveMessage.userProvince = ms.p_cardReceiveProvince,
                receiveMessage.userCity = ms.p_cardReceiveCity,
                receiveMessage.cardId =ms.p_cardId,


               ctx.body = {"code": 200, "message": 'ok', data: receiveMessage};
            }else {
                ctx.body = {"code": 200, "message": 'ok', data:'超过5次机会了'};
            }
             } catch (err) {
            ctx.body = {"code": 200, "message": err.message, data: []}
        }
    }
}