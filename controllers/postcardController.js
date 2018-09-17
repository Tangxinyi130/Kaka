const postcardDAO = require('../model/postcardDAO');
module.exports = {
    //明信片实时动态-收到最新动态
    getNewReceive:async (ctx, next) => {
        try {
            let newRecevie= await postcardDAO.getNewReceive();
            ctx.body = {"code": 200, "message": "ok:最新实时收到动态", data: newRecevie};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误",};
        }
    },
    //明信片实时动态：发送最新动态
    getNewSend:async(ctx,next) =>{
        try {
            let NewSend = await postcardDAO.getNewSend();
            ctx.body = {"code": 200, "message": "ok，最新实时发送动态", data: NewSend};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误",};
        }
    },
    //明信片收发实时动态
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
    }
}