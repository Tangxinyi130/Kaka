const DAO = require("../model/DAO");
class DB {
    //实时动态-最新发送动态
    getNewSend(){
        return DAO('SELECT\n' +
            '\tfrom1.cardId,\n' +
            '\tfrom1.userId AS cardSenderId,\n' +
            '\tfrom1.userNickname cardSenderName,\n' +
            '\tfrom1.cardSendRegion,\n' +
            '\tfrom1.cardReceiver AS cardReceiverId,\n' +
            '\tuserinfo.userNickname AS cardReceiverName,\n' +
            '\tfrom1.cardReceiveRegion,\n' +
            '\tfrom1.cardSendTime,\n' +
            '\tfrom1.cardReceiveTime\n' +
            'FROM\n' +
            '\t(\n' +
            '\tSELECT\n' +
            '\t\tuserId,\n' +
            '\t\tuserNickname,\n' +
            '\t\tcardSendRegion,\n' +
            '\t\tcardReceiver,\n' +
            '\t\tcardId,\n' +
            '\t\tcardSendTime,\n' +
            '\t\tcardReceiveRegion,\n' +
            '\t\tcardReceiveTime \n' +
            '\tFROM\n' +
            '\t\tpostcard pd\n' +
            '\t\tLEFT JOIN userinfo ui ON pd.cardSender = ui.userId \n' +
            '\t) AS from1\n' +
            '\tLEFT JOIN userinfo ON from1.cardReceiver = userinfo.userId \n' +
            'WHERE\n' +
            '\tfrom1.cardSendTime > DATE_SUB( NOW( ), INTERVAL 2 DAY ) \n' +
            '\tAND cardReceiveTime IS NULL \n' +
            'ORDER BY\n' +
            '\tfrom1.cardSendTime DESC');
    }
    //实时动态-最新收到动态
    getNewReceive(){
        return DAO('SELECT\n' +
            '\tfrom1.cardId,\n' +
            '\tfrom1.userId AS cardSenderId,\n' +
            '\tfrom1.userNickname cardSenderName,\n' +
            '\tfrom1.cardSendRegion,\n' +
            '\tfrom1.cardReceiver AS cardReceiverId,\n' +
            '\tuserinfo.userNickname AS cardReceiverName,\n' +
            '\tfrom1.cardReceiveRegion,\n' +
            '\tfrom1.cardSendTime,\n' +
            '\tfrom1.cardReceiveTime\n' +
            'FROM\n' +
            '\t(\n' +
            '\tSELECT\n' +
            '\t\tuserId,\n' +
            '\t\tuserNickname,\n' +
            '\t\tcardSendRegion,\n' +
            '\t\tcardReceiver,\n' +
            '\t\tcardId,\n' +
            '\t\tcardSendTime,\n' +
            '\t\tcardReceiveRegion,\n' +
            '\t\tcardReceiveTime \n' +
            '\tFROM\n' +
            '\t\tpostcard pd\n' +
            '\t\tLEFT JOIN userinfo ui ON pd.cardSender = ui.userId \n' +
            '\t) AS from1\n' +
            '\tLEFT JOIN userinfo ON from1.cardReceiver = userinfo.userId \n' +
            'WHERE\n' +
            '\tfrom1.cardReceiveTime > DATE_SUB( NOW( ), INTERVAL 2 DAY ) \n' +
            'ORDER BY\n' +
            '\tfrom1.cardReceiveTime DESC')
    }


}
module.exports = new DB();