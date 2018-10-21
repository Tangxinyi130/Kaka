const regionDAO = require("../model/regionDAO");
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
            await regionDAO.insertUser(ctx.params.tel,ctx.params.pwd);
            ctx.body = {"code": 200, "message": "ok", data:[]};
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误",};
        }
    },
};