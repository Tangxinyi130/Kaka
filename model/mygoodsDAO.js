const DAO=require('../model/DAO');
class DB{
    //activity--支付成功时添加数据到mygoods表
    addMyGoods(goods){
        return DAO("insert into mygoods(mygoodsUserId,mygoodsGoodsId,mygoodsIsReceived,mygoodsDate,mygoodsAddress) VALUES(?,?,?,?,?)",[goods.userId,goods.goodsId,0,goods.goodsTime,goods.goodsAddress]);
    }
    //activity--支付成功时添加数据到myactivity表
    addMyActivity(activity){
        return DAO("insert into myactivity(myactivityUserId,myactivityActivityId) VALUES(?,?)",[activity.userId,activity.activityId]);
    }
    //修改收货地址
    updataAddress(newAddress,userId,activityAddress){
        return DAO("update  shippingaddress set address=? where shippingAddressUserId=? and address=?;",[newAddress,userId,activityAddress]);
    }
    //添加收货地址
    addAddress(userId,activityAddress){
        return DAO("insert into shippingaddress(shippingAddressUserId,address) values(?,?)",[userId,activityAddress]);
    }
    //删除收货地址
    delAddress(userId,activityAddress){
        return DAO("delete from shippingaddress where shippingAddressUserId=? and address=?;",[userId,activityAddress]);
    }
}
module.exports=new DB();