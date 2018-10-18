const activityDAO=require('../model/activityDAO');
const userinfoDAO=require('../model/userinfoDAO');
const mygoodsDAO=require('../model/mygoodsDAO');
module.exports={
    //activity--获取活动页面的所有信息 1、包括哪些年份 2、每年中所有月份
    getAllActivity:async (ctx,next)=>{
        try{
            let allData=await activityDAO.getAllActivity();
            let activityYear=await activityDAO.getActivityYear();
            let activityMonth=[];
            for(let i=0;i<activityYear.length;i++){
                console.log(activityYear[i].activityYear)
                activityMonth[i]=await activityDAO.getActivityMon(activityYear[i].activityYear);
            }
            console.log(activityMonth);
            let jsondata={
                allData:allData,
                activityYear:activityYear,
                activityMonth:activityMonth
            }
            ctx.body={"code":200,"message":"ok",data:jsondata};
        }catch (e){
            ctx.body={"code":500,"message":"活动主界面所有信息！错误！",data:[]};
        }
    },
    //activity--点击一个页面，通过活动id来获取页面当前页面显示的活动信息
    getActivity:async (ctx,next)=>{
        try{
            let oneActivity=await activityDAO.getActivity(ctx.params.activityId);
            ctx.body={"code":200,"message":"ok",data:oneActivity};
        }catch (e){
            ctx.body={"code":500,"message":"每个活动页面！错误！",data:[]};
        }
    },
    //activity--立即预约-确认信息界面（用户地址和活动信息简介）
    getActivityDetail:async (ctx,next)=>{
        try{
            const userId=1;
            let oneActivity=await activityDAO.getActivity(ctx.params.activityId);
            let userInformation=await userinfoDAO.getOneUser(userId);
            let alldReservation={
                oneActivity:oneActivity,
                userInformation:userInformation
            };
            ctx.body={"code":200,"message":"ok",data:alldReservation};
        }catch (e){
            ctx.body={"code":500,"message":"立即预约页面！错误！"+e.message,data:[]};
        }
    },

    //activity--根据年份月份获取活动信息
    getActivityTime:async (ctx,next)=>{
        try{
            let year=ctx.params.year;
            let month=ctx.params.month;
            let allTime={
                year:year,
                month:month
            };
            let timeActivity=await activityDAO.getActivityTime(allTime);
            ctx.body={"code":200,"message":"ok",data:timeActivity};
        }catch(e){
            ctx.body={"code":500,"message":"根据年份月份查询活动，错误！",data:timeActivity};
        }
    },
    //修改收货地址
    updataAddress:async(ctx,next)=>{
        try{
            await mygoodsDAO.updataAddress(ctx.request.body.newAddress,ctx.request.body.userId,ctx.request.body.activityAddress);
            ctx.body={"code":200,"message":"ok",data:[]}
        }catch(e){
            ctx.body = {"code":500,"message":"服务器错误"+e.toString(),data:[]}
        }
    },
//添加收货地址
    addAddress:async(ctx,next)=>{
        try{
           await mygoodsDAO.addAddress(ctx.request.body.userId,ctx.request.body.activityAddress);
            ctx.body={"code":200,"message":"ok",data:[]}
        }catch(e){
            ctx.body = {"code":500,"message":"服务器错误"+e.toString(),data:[]}
        }
    },
//删除收货地址
    delAddress:async(ctx,next)=>{
        try{
            await mygoodsDAO.delAddress(ctx.request.body.userId,ctx.request.body.activityAddress);
            ctx.body={"code":200,"message":"ok",data:[]}
        }catch(e){
            ctx.body = {"code":500,"message":"服务器错误"+e.toString(),data:[]}
        }
    }
}