const managerDAO = require('../model/managerDAO');
const goodsDAO = require('../model/goodsDAO');
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
            let classify = ctx.request.body.classfic;
            let classifyInfo = await managerDAO.getActivityClassify(ctx.request.body.classfic);
            ctx.body={"code":200,"message":classify+"类的文章",data:classifyInfo}
        }catch(e){
            ctx.body={"code":500,"message":"服务器错误"+e.toString(),data:[]}
        }
    },
    //按活动id删除某篇活动
    deleteActivity:async(ctx,next)=>{
        try{
            let activityId = ctx.request.body.activityId;
            console.log(activityId);
            let type = await managerDAO.getActivityTypeById(activityId);
            //如果删除的文章是商品类，则先删除商品信息
            if(type[0].activityType=='商品'){
                await goodsDAO.deleteGoodsByActivityId(activityId);
            }
            //删除文章
            await managerDAO.deleteActivity(activityId);
            ctx.body = {code:200,"message":"删除成功",data:[]}
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
            await managerDAO.activityEdit(activityEdit.acName,activityEdit.acStartDate,activityEdit.acType,activityEdit.acDetails);
            ctx.body = {code:200,"message":"插入成功,插入的数据是：",data:activityEdit}
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
    }

};