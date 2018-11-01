const managerDAO = require('../model/managerDAO');
const goodsDAO = require('../model/goodsDAO');
const myactivityDAO =require('../model/myactivityDAO');
const formidable = require("formidable");
const path = require('path');
module.exports = {
    //后台管理登录
    doLogin:async(ctx,next)=> {
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
            let adminName = await managerDAO.getAdmin(username);
            console.log(adminName);

            if (adminName == "") {
                data.userUnExsit = true;
                // ctx.body = '用户名不存在';
            }
            else if (adminName[0].managerId === username) {
                let adminPwd = await  managerDAO.getAdminPwd(username);
                console.log('数据库里的密码：');
                // console.log(adminPwd[0].managerPwd);
                if (await  adminPwd[0].managerPwd === password) {
                    data.loginSucess = true;
                    // ctx.body = '登陆成功';
                } else {
                    data.passwordWrong = true;
                    // ctx.body = '密码错误';
                }
            }
            ctx.body = {"code": 200, "message": "ok", data: data}
        } catch (e) {
            ctx.body = {"code": 500, "message": "服务器错误" + e.toString(), data: []}
        }
    },
    //查看发布过的所有活动
    getAllActivity:async(ctx,next)=>{
        try{
            let allActivityInfo = await managerDAO.getAllActivity();
            console.log(allActivityInfo)
            ctx.body={"code":200,"message":"所有发布过的活动",data:allActivityInfo}
        }catch(e){
            ctx.body={"code":500,"message":"服务器错误"+e.toString(),data:[]}
        }
    },
    //按活动类型分类列出统一类的所有文章信息
    getActivityClassify:async(ctx,next)=>{
        try{
            let classify = ctx.params.dif;
            let classifyInfo = await managerDAO.getActivityClassify(classify);
            ctx.body={"code":200,"message":classify+"类的文章",data:classifyInfo}
        }catch(e){
            ctx.body={"code":500,"message":"服务器错误"+e.toString(),data:[]}
        }
    },
    //按活动id删除某篇活动
    deleteActivity:async(ctx,next)=>{
        try{
            let info={};
            let activityId = ctx.params.activityId;
            let type = await managerDAO.getActivityTypeById(activityId);
            let myactivity = await  myactivityDAO.getMyactivityByAcId(activityId);
            //如果用户参与了该项活动，则不允许删除
            if(myactivity.length==0){
                //如果删除的文章是商品类，则先删除商品信息
                if(type[0].activityType=='商品'){
                    //删除相关商品
                    await goodsDAO.deleteGoodsByActivityId(activityId);
                    //删除文章
                    await managerDAO.deleteActivity(activityId);
                    info.delete = "success";
                }else if(type[0].activityType=='公告'){
                    await managerDAO.deleteActivity(activityId);
                    info.delete = "success";
                }
            }else {
                info.reject = "reject";
                info.delete = "fail";
            }
            ctx.body = {code:200,"message":"删除成功",data:info}
        }catch(e){
            ctx.body = {code:500,"message":"服务器出错"+e.toString(),data:[]}
        }
    },
    //活动发布-公告类文章
    //acName,acStartDate,acType,acDetails
    activityEdit:async(ctx,next)=>{
        try{
            let activityEdit = ctx.request.body;
            console.log(activityEdit);
            let success = await managerDAO.activityEdit(activityEdit.acName,activityEdit.acStartDate,activityEdit.acType,activityEdit.acDetails);
            ctx.body = {code:200,"message":"插入成功,插入的数据是：",data:success}
        }catch(e){
            ctx.body = {code:500,"message":"服务器出错"+e.toString(),data:[]}
        }
    },
    //活动发布-商品类文章(acName,acStartDate,acEndDate,acType,acDetails)
    activityGoodsEdit:async(ctx,next)=>{
        try{
            let acGoodsEdit = ctx.request.body;
            await managerDAO.activityGoodsEdit(acGoodsEdit.acName,acGoodsEdit.acStartDate,acGoodsEdit.acEndDate,acGoodsEdit.acType,acGoodsEdit.acDetails)
            ctx.body = {code:200,"message":"插入成功,插入的数据是：",data:acGoodsEdit}
        }catch (e) {
            ctx.body = {code:500,"message":"服务器出错"+e.toString(),data:[]}
        }
    },
    //修改已经发布的过的文章
    updateActivity:async(ctx,next)=>{
        try {
            let activity = ctx.request.body;
            let activityType = activity.acType;
            if(activityType=='商品'){
                await managerDAO.updateGoodsActivity(activity.acId,activity.acName,activity.acStartDate,activity.acEndDate,activity.acType,activity.acDetails);
            }else if(activityType=='公告'){
                await managerDAO.updateActivity(activity.acId,activity.acName,activity.acStartDate,activity.acType,activity.acDetails);
            }
            ctx.body={code:200,"message":activityType+"文章更新成功",data:activity};

        }catch(e){
            ctx.body = {code:500,"message":"服务器出错"+e.toString(),data:[]};
        }
    },
    uploadActivityImage:async(ctx,next)=>{
        const form = new formidable.IncomingForm();
        form.uploadDir = '../public/activityEdit';
        form.keepExtensions = true;
        let urlImages = [];
        return new Promise(function(resolve,reject){
            form.parse(ctx.req,function(err,fields,files){
                if(err) reject(err.message)
                console.log('获取数据文件了......')
                // if(err){console.log(err); return;}
                for(name in files){
                    urlImages.push(path.parse(files[name].path).base);
                }
                console.log(urlImages);
                resolve(urlImages)
            })
        }).then((data)=>{
            //按wangeditor格式，输出结果，把上传的文件名返回
            ctx.body = {errno:0,data:data};
        })
    },

};