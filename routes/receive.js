const router = require('koa-router')();
const path = require('path')
const fs = require('fs')
const formidable = require("formidable");
const moment = require("moment");
const postcardController=require("../controllers/postcardController");
const postcardDAO = require('../model/postcardDAO');
// const poolCtroller=require("../controllers/poolController");

router.prefix('/receive');
//根据所输入的明信片id，更新数据库中所对应的明信片的图片
router.get('/uploadPic/:cardId/:cardPic',async (ctx,next)=>{
    await postcardController.uploadPic(ctx,next)
});
//实现接收功能,更新了postcard里的接收时间和把发送方添加到池里面，距离还没写
router.get('/doReceive/:cardId/:userId',async (ctx,next)=>{
    await postcardController.receive(ctx,next)
});

//提供两个用户的地址，由前端进行距离计算
router.get("/getAddress/:sendUserId/:receiveUserId", async (ctx, next) => {
    await postcardController.calculateDistance(ctx, next);
});
//获取前端计算完成的距离，插入对应的明信片信息中
router.get("/insertDistance/:distance/:cardId", async (ctx, next) => {
    await postcardController.updateDistance(ctx, next);
});

//上传文件的路由
router.post('/uploadfile',async function (ctx, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = '../public/postcardpic';   //设置文件存放路径
    form.multiples = true;  //设置上传多文件
    var filename = "";
    var src = "";
    var fileDes = "";

    form.parse(ctx.req, async function (err, fields, files) {
        // console.log(files)
        //根据files.filename.name获取上传文件名，执行后续写入数据库的操作
        filename = files.filename.name;
        src = path.join(__dirname, files.filename.path);
        fileDes = path.basename(filename, path.extname(filename)) + moment(new Date()).format("YYYYMMDDHHMMSS") + path.extname(filename);
        fs.rename(src, path.join(path.parse(src).dir, fileDes));
        let str = `http://localhost:3000/postcardpic/${fileDes}`;
        console.log(str);
        console.log(fields);
        console.log("mydata:   " + fields.mydata);
        try {
            await postcardDAO.uploadPic(str, fields.mydata);
            ctx.body={"code":200, "message":"ok", data:[]};
        } catch (e) {
            ctx.body={"code":500, "message":"err"+e.message, data:[]};
        }
        //
        // //根据fileds.mydata获取上传表单元素的数据，执行写入数据库的操作
    })
    // if(err){
    //     ctx.body={'code':500,"message":"err"+err.message,data:[]};
    // }
})


module.exports = router;