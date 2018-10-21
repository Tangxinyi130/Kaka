const DAO = require("../model/DAO");
class DB {
    //根据文章id查询我的文章表内是否有被收藏参与
    getMyactivityByAcId(activityId){
        return DAO('SELECT myactivityId FROM myactivity WHERE myactivityActivityId = ?',activityId);
    }
}
module.exports = new DB();