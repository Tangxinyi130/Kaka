const DAO = require("../model/DAO");
class DB {
//postcard--图片被收藏数目
    getCollectionNumber(cardId){
        return DAO('select count(1) number from collection where collectionCardId=?', [cardId]);
    }
}
module.exports = new DB();