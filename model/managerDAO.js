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
}
module.exports = new DB();