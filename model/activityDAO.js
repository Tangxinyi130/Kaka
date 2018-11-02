const DAO=require('../model/DAO');
class DB{
    //activity--获取所有活动信息
    getAllActivity(){
        return DAO('select * from activity a left join goods g on a.activityId=g.goodsActivityId ORDER BY activityStartDate DESC;',[]);
    }

    //activity--或取所有活动的年份
    getActivityYear(){
        return DAO('select activityYear from (select activityId,MONTH(activityStartDate) activityMonth,year(activityStartDate) activityYear from activity ) time GROUP BY activityYear ORDER BY activityYear DESC ')
    }
    //activity--获取每个年份中的所有月份
    getActivityMon(month){
        return DAO('select activityMonth from (select activityId,MONTH(activityStartDate) activityMonth,year(activityStartDate) activityYear from activity ) time where activityYear=? GROUP BY activityMonth ORDER BY activityMonth DESC',[month])
    }
    //activity--获取每个活动的详情页面
    getActivity(activityId){
        return DAO('select * from activity a left join goods g on a.activityId=g.goodsActivityId where activityId=?',[activityId])
    }
    //activity--根据年份月份查询相关的活动
    getActivityTime(time){
        return DAO("select * from (select activityId,activityName,activityDetails,activityStartDate,activityEndDate,activityImage,activityType\n" +
            ",MONTH(activityStartDate) activityMonth,year(activityStartDate) activityYear from activity) time left join goods g on time.activityId=g.goodsActivityId where activityYear=? and activityMonth=?",[time.year,time.month])
    }
}
module.exports=new DB();