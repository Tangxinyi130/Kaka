const regionDAO = require("../model/regionDAO");
const crypto = require("crypto");
module.exports = {
    getTel:async (ctx, next) =>{
        try {
            let telNum= await regionDAO.getTel(ctx.params.tel);
            console.log(telNum)
            ctx.body = {"code": 200, "message": "ok", data:telNum};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误",};
        }
    },
    insertUser:async (ctx, next) =>{
        try {
            //对密码进行加密
            const hash=crypto.createHash("md5");
            hash.update(ctx.params.pwd);
            var npwd=hash.digest("hex");
            console.log(npwd);
            await regionDAO.insertUser(ctx.params.tel,npwd);
            ctx.body = {"code": 200, "message": "ok", data:[]};
            //原来的注册
            // await regionDAO.insertUser(ctx.params.tel,ctx.params.pwd);
            // ctx.body = {"code": 200, "message": "ok", data:[]};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误",};
        }
    },
};