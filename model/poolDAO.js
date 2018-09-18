const DAO=require('../model/DAO')
class DB {
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

    //得到发送用户的地区
    getCardSendRegion(userId){
        return DAO(' SELECT userProvince from userinfo where userId=?',[userId])
    }

    //得到当前发送用户的地区明信片的编号加一
    updataRegion(userId){
        return DAO('update region set regionNum = regionNum + 1 where regionName =(SELECT userProvince  from userinfo where userId=?); ',[userId])
    }
    //将抽到用户的地区明信片的编号加一
    // updataRegion(){
    //     return DAO('update region set regionNum = regionNum + 1 where regionName =(SELECT userProvince  from userinfo where userId=(Select pooluserId from pool Where poolTime=(SELECT min(poolTime)from pool))); ',[])
    // }
    // // 查询抽到用户地区明信片编号和数量
    // getRegion(){
    //     return DAO('SELECT regionId,regionNum from region where regionName =( SELECT userProvince from userinfo where userId=(Select pooluserId from pool Where poolTime=(SELECT MIN(poolTime)from pool)));',[])
    // }

    // 查询当前用户地区明信片编号和数量
    getRegion(userId){
        return DAO('SELECT regionId,regionNum from region where regionName =( SELECT userProvince from userinfo where userId=?);',[userId])
    }
    setCardId(userId){
        return DAO('SELECT concat(regionId,\'-0000\',regionNum) cardId from region where regionName =( SELECT userProvince from userinfo where userId=?)',[userId])
    }
    insertPostcard(postCard){
        return DAO('insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)values(?, ?, ?, ?, ?, now())',
            [
                postCard.cardId,
                postCard.cardSender,
                postCard.cardReceiver,
                postCard.cardSendRegion,
                postCard.cardReceiveRegion,
            ])
    }
    //查寻时间最小的poolTime
    selMinTime(){
        return DAO('SELECT min(poolTime) poolTime from pool',[])
    }
    //把接收方方从pool池里面删除
    delectReceive(poolTime){
        return DAO(' DELETE from pool where poolTime=?',[poolTime])
    }
    //把发送方添加到pool池里
    insertSend(userId){
        return DAO('INSERT into pool(poolUserId,poolTime)VALUES(?,now())',[userId])
    }
}
module.exports=new DB();