const DAO=require('../model/DAO');
class DB{
    //activity--支付成功时添加数据到mygoods表
    addMyGoods(goods){
        return DAO("insert into mygoods(mygoodsUserId,mygoodsGoodsId,mygoodsIsReceived) VALUES(?,?,?)",[goods.userId,goods.goodsId,0]);
    }
    //activity--支付成功时添加数据到myactivity表
    addMyActivity(activity){
        return DAO("insert into myactivity(myactivityUserId,myactivityActivityId) VALUES(?,?)",[activity.userId,activity.activityId]);
    }
}
module.exports=new DB();