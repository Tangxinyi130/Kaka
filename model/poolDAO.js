const DAO=require('../model/DAO')
class DB {
    //
    getUserId(){
        return DAO('SELECT pooluserId from pool Where poolTime=(SELECT min(poolTime)from pool)',[])
    }
    updataRegion(){
        return DAO('update region set regionNum = regionNum + 1 where regionName =(SELECT userProvince  from userinfo where userId=(Select pooluserId from pool Where poolTime=(SELECT min(poolTime)from pool))); ',[])
    }
    getRegion(){
        return DAO('SELECT regionId,regionNum from region where regionName =( SELECT userProvince from userinfo where userId=(Select pooluserId from pool Where poolTime=(SELECT MIN(poolTime)from pool)));',[])
    }
    setCardId(regionId){
        return DAO('SELECT concat(regionId,\'-0000\',regionNum)from region where regionId=?',[regionId])
    }
    insertPostcard(postCardId){
        return DAO('insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)values(?, ?, ?, ?, ?, now();',
            [
                postCardId.cardId,
                postCardId.cardSender,
                postCardId.cardReceiver,
                postCardId.cardSendRegion,
                postCardId.cardReceiveRegion,
            ])
    }
}
module.exports=new DB();