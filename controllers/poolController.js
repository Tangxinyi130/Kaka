var poolDAO = require("../model/poolDAO")
module.exports = {
    //完成发送功能，返回接收方一些基本信息和发送的明信片信息
    sendPostcard: async (ctx, next) => {
        try {
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
                ctx.body = {"code": 200, "message": 'ok', data:receiveMessage};
             } catch (err) {
            ctx.body = {"code": 200, "message": err.message, data: []}
        }
    },
    //限制发送的次数和判断pool池里面是否有数据
    limitTimes: async (ctx, next) => {
        try {
            //得到地址为空的用户的数量
            let useraddress= await poolDAO.userAddress(ctx.params.userId);
            let useraddress1=useraddress[0];
            //得到pool池里面的数据的总数
            let poolsum= await poolDAO.poolCount(ctx.params.userId);
            let poolsum1=poolsum[0];
            //得到用户已经发送的次数
            let count= await poolDAO.limitCount(ctx.params.userId);
            let count1=count[0];
            console.log(count1.sum);
            let t= {};
            t.times= count1.sum;
            t.pooltimes=poolsum1.sum;
            t.addresscount=useraddress1.sum;
            ctx.body = {"code": 200, "message": 'ok', data:t};

        } catch (err) {
            ctx.body = {"code": 200, "message": err.message, data: []}
        }
    },
}