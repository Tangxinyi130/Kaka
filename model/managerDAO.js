const DAO = require("../model/DAO");
class DB {
    //根据管理员id查询管理员id
    getAdmin(managerId){
        return DAO('SELECT managerId FROM manager WHERE  managerId = ?',[managerId]);
    }
    //根据管理员id查询管理员的密码
    getAdminPwd(managerId){
        return DAO('SELECT managerPwd FROM manager WHERE  managerId = ?',[managerId]);
    }
    //获取发布过的全部文章
    getAllActivity(){
        return DAO('SELECT activityId,activityName,activityType,activityStartDate FROM activity ORDER BY activityStartDate DESC');
    }
    //获取按活动类型分类文章
    getActivityClassify(activityType){
        return DAO('SELECT activityId,activityName,activityType,activityStartDate FROM activity WHERE activityType = ? ORDER BY activityStartDate DESC',[activityType]);
    }
    //删除某篇发布过的文章
    deleteActivity(activityId){
        return DAO('DELETE FROM activity WHERE activityId = ?',[activityId]);
    }
}
module.exports = new DB();