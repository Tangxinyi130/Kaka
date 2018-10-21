const DAO = require("../model/DAO");

class DB {
    //查看该手机在用户中是否存在
    getTel(tel) {
        return DAO("select count(1) sum from userinfo where userTel=?" , [tel]);
    }
    //向数据库中插入信息
   insertUser(tel,pwd){
        return DAO("insert into userinfo(userTel,userPwd)values(?,?);",[tel,pwd])
   }
}

module.exports = new DB();