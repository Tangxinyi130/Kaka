const DAO=require('../model/DAO');
class DB{
    addMyGoods(goods){
        return DAO("insert into mygoods(mygoodsUserId,mygoodsGoodsId,mygoodsIsReceived) VALUES(?,?,?)",[goods.userId,goods.goodsId,0]);
    }
    addMyActivity(activity){
        return DAO("insert into myactivity(myactivityUserId,myactivityActivityId) VALUES(?,?)",[activity.userId,activity.activityId]);
    }
}
module.exports=new DB();