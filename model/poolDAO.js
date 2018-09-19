const DAO=require('../model/DAO')
class DB {
    //向明信片卡里面插入抽到的明信片的id,和接收方以及发送方的一些基本信息
    sendPostcard(userId){
        return DAO('call p_send(?);',[userId])
    }
    //得到被抽到用户的id
    getUserId(){
        return DAO('SELECT  * from pool Where poolTime=(SELECT min(poolTime)from pool)',[])
    }
    //得到接收者的基本信息
    getReceiveMessage(){
        return DAO('SELECT userNickname,userSex,userEmail,userHeadPic,userBirthday,userProvince,userCity from userinfo where userId=(Select pooluserId from pool Where poolTime=(SELECT MIN(poolTime)from pool))',[])
    }
    //得到被抽到用户的地区
    getCardReceiveRegion(){
        return DAO('SELECT userProvince from userinfo where userId=(Select pooluserId from pool Where poolTime=(SELECT min(poolTime)from pool))',[])
    }

    setCardId(userId){
        return DAO('SELECT concat(regionId,\'-0000\',regionNum) cardId from region where regionName =( SELECT userProvince from userinfo where userId=?)',[userId])
    }

}
module.exports=new DB();