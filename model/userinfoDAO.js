const DAO = require("../model/DAO");

class DB {
    //users === 查询指定用户
    getOneUser(userId) {
        return DAO("select * from userinfo where userId = ?" , [userId]);
    }
    //users === 用户关注数
    countAttentionNum(userId) {
        return DAO("select count(attentionName) attentionNum " +
                    "from attention " +
                    "where attentionFan = ?", [userId]);
    }
    //users === 用户粉丝数
    countFansNum(userId) {
        return DAO("select count(attentionFan) fanNum " +
                    "from attention " +
                    "where attentionName = ?", [userId]);
    }
    //users === 寄出的明信片数量
    countSendNum(userId) {
        return DAO("select count(cardSender) sendNum " +
                    "from postcard " +
                    "where cardSender = ?", [userId]);
    }
    //users === 收到的明信片数量
    countReceiveNum(userId) {
        return DAO("select count(cardReceiver) receiveNum " +
                    "from postcard " +
                    "where cardReceiver = ? and cardReceiveTime is not null", [userId]);
    }
    //users === 寄出的明信片总距离
    countDistance(userId) {
        return DAO("select sum(cardDistance) distanceNum " +
                    "from postcard " +
                    "where cardSender = ?", [userId]);
    }
    //users === 加入网站的天数
    countJoinTime(userId) {
        return DAO("select TO_DAYS(now()) - TO_DAYS(userTime) joinTime " +
                    "from userinfo " +
                    "where userId = ?", [userId]);
    }
    //users === 更改关于我的
    updateAboutMe(userId, newAboutMe) {
        return DAO("update userinfo " +
                    "set userAboutMe = ? " +
                    "where userId = ?", [newAboutMe, userId]);
    }
    //users === 查询已发送的明信片
    getUserSend(userId) {
        return DAO("select cardId, cardReceiver, userName, cardReceiveRegion, cardSendTime, cardReceiveTime, cardPic " +
                    "from postcard, userInfo " +
                    "where cardSender = ? and postcard.cardReceiver = userinfo.userId", [userId]);
    }
}

module.exports = new DB();