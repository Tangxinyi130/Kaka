const DAO=require('../model/DAO');
class DB{
    getAllActivity(){
        return DAO('select * from activity ORDER BY activityEndDate DESC',[]);
    }
    getActivity(activityId){
        return DAO('select * from activity a left join goods g on a.activityId=g.goodsActivityId where activityId=?',[activityId])
    }
}
module.exports=new DB();