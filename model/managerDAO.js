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
    //通过文章id获取文章类型
    getActivityTypeById(activityId){
        return DAO('SELECT activityType FROM activity WHERE activityId = ?',[activityId]);
    }
    //删除某篇发布过的文章
    deleteActivity(activityId){
        return DAO('DELETE FROM activity WHERE activityId = ?',[activityId]);
    }
    //获取某篇文章的所有信息
    getActivityById(activityId){
        return DAO('SELECT activityId,activityName,activityStartDate,activityDetails,activityImage,activityType FROM activity WHERE activityId=?',[activityId]);
    }

    //活动发布-公告类文章
    activityEdit(acName,acStartDate,acType,acDetails,acImage){
        return DAO('insert into activity(activityName, activityStartDate, activityType, activityDetails,activityImage) values(?,?,?,?,?)',[acName,acStartDate,acType,acDetails,acImage]);
    }
    //活动发布-商品类文章
    activityGoodsEdit(acName,acStartDate,acEndDate,acType,acDetails){
        return DAO('insert into activity(activityName, activityStartDate, activityEndDate, activityType, activityDetails)\n' +
            'values(?,?,?,?,?)',[acName,acStartDate,acEndDate,acType,acDetails]);
    }
    //修改发布过的活动-公告类
    updateActivity(activityId,acName,acStartDate,acType,acDetails,acImage){
        return DAO('UPDATE activity SET activityName = ?, activityStartDate=?, activityType=?,activityDetails =?, activityImage=? WHERE activityId = ?;',[acName,acStartDate,acType,acDetails,acImage,activityId]);
    }
    //修改发布过的活动-商品类
    updateGoodsActivity(activityId,acName,acStartDate,acEndDate,acType,acDetails){
        return DAO('UPDATE activity \n' +
            'SET activityName = ?,\n' +
            'activityStartDate = ?,\n' +
            'activityEndDate = ?,\n' +
            'activityType = ?,\n' +
            'activityDetails = ? \n' +
            'WHERE\n' +
            '\tactivityId = ?',[acName,acStartDate,acEndDate,acType,acDetails,activityId]);
    }
    //
}
module.exports = new DB();