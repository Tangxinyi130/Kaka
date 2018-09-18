const DAO = require("../model/DAO");
class DB {
    //postcard--图片被收藏数目
    getCollectionNumber(cardId){
        return DAO('select count(1) number from collection where collectionCardId=?', [cardId]);
    }
    //postcard--添加卡片收藏数据
    insertCollection(data){
        return DAO('insert into collection(collectionUserId,collectionCardId) VALUES(?,?)',[data.userId,data.cardId]);
    }
    //postcard--删除要取消收藏的记录
    deleteCollection(data){
        return DAO("delete from collection where collectionUserId=? and collectionCardId=?",[data.userId,data.cardId])
    }
}
module.exports = new DB();