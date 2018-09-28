const DAO = require("../model/DAO");
class DB {
    //新添加商品信息
    insertGoods(goodsActivityId,goodsName,goodsNum,goodsPrice,goodsPic,goodsDetails){
        return DAO('insert into goods(goodsActivityId, goodsName, goodsNum, goodsPrice, goodsPic, goodsDetails)\n' +
            'values(?,?,?,?,?,?)',[goodsActivityId,goodsName,goodsNum,goodsPrice,goodsPic,goodsDetails]);
    }
    //查询商品所有信息
    getAllGoods(){
        return DAO('SELECT goodsId,goodsActivityId,goodsName,goodsNum,goodsPrice,goodsPic,goodsDetails FROM goods');
    }
    //更具商品Id查询商品
    findGoodsById(goodsId){
        return DAO('SELECT goodsId,goodsActivityId,goodsName,goodsNum,goodsPrice,goodsPic,goodsDetails FROM goods WHERE goodsId=?',[goodsId]);
    }
    //根据文章id删除商品信息
    deleteGoodsByActivityId(activityId){
        return DAO('DELETE FROM goods WHERE goodsActivityId=?',[activityId]);
    }
}
module.exports = new DB();