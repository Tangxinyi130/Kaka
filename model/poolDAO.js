const DAO=require('../model/DAO')
class DB {
    //判断发送池里面有没有数据
    poolCount(userId){
        return DAO('select count(1) sum from pool where poolUserId<>?',[userId])
    }
    //判断发送的次数
    limitCount(userId){
        return DAO('select count(1) sum from postcard where cardReceiveTime is null and cardSender= ?',[userId])
    }
    //判断这个用户的地址是不是空如果是空的话将会返回1
    userAddress(userId){
        return DAO('select count(1) sum from userinfo where userId=? and userAddress is null',[userId])
    }
    //完成发送功能，返回接收方一些基本信息和发送的明信片信息
    sendPostcard(userId){
        return DAO('call pro_send(?);',[userId])
    }
}
module.exports=new DB();