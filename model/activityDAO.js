const DAO=require('../model/DAO');
class DB{
    //activity--获取所有活动信息
    getAllActivity(){
        return DAO('select * from activity ORDER BY activityEndDate DESC',[]);
    }
    //activity--获取每个活动的详情页面
    getActivity(activityId){
        return DAO('select * from activity a left join goods g on a.activityId=g.goodsActivityId where activityId=?',[activityId])
    }
    //activity--根据年份月份查询相关的活动
    getActivityTime(time){
        return DAO("select * from (select activityId,activityName,activityDetails,activityStartDate,activityEndDate,activityType\n" +
            ",MONTH(activityStartDate) activityMonth,year(activityStartDate) activityYear from activity) time where activityYear=? and activityMonth=?",[time.year,time.month])
    }
}
module.exports=new DB();