const DAO = require("../model/DAO");
class DB {
    //index--实时动态-最新发送动态
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
    //index--实时动态-最新收到动态
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

    //wall--获取所有图片
    getAllCard(){
        return DAO('select cardId,cardPic,cardLike from postcard where cardReceiveTime is not null and cardPic is not null ORDER BY cardReceiveTime DESC;',[]);
    }
    //wall--根据搜索框内输入的城市搜索明信片
    getPostCard(city){
        return DAO('select * from postcard where cardSendRegion=? and cardReceiveTime is not null and cardPic is not null ORDER BY cardReceiveTime DESC;\n',[city]);
    }
    //postcard--点击没张照片的详情界面
    getCardInformation(cardId){
        return DAO('SELECT\n' +
            '\ts.userId,\n' +
            '\ts.userHeadPic,\n' +
            '\ts.userNickname,\n' +
            '\ts.userCity,\n' +
            '\tr.userId userId1,\n' +
            '\tr.userHeadPic userHeadPic1,\n' +
            '\tr.userNickname userNickname1,\n' +
            '\tr.userCity userCuty1,\n' +
            '\tcardDistance,\n' +
            '\tcardPic,\n' +
            'DAY \n' +
            'FROM\n' +
            '\t(\n' +
            '\tSELECT\n' +
            '\t\tuserId,\n' +
            '\t\tuserHeadPic,\n' +
            '\t\tuserNickname,\n' +
            '\t\tuserCity,\n' +
            '\t\tcardReceiver,\n' +
            '\t\tcardDistance,\n' +
            '\t\tcardPic,\n' +
            '\t\tcardId,\n' +
            '\t\tDATEDIFF( cardReceiveTime, cardSendTime ) AS DAY \n' +
            '\tFROM\n' +
            '\t\tuserinfo u\n' +
            '\t\tLEFT JOIN postcard p ON u.userId = p.cardSender \n' +
            '\t) s\n' +
            '\tLEFT JOIN userinfo r ON s.cardReceiver = r.userId \n' +
            'WHERE\n' +
            '\ts.cardId = ? ',[cardId]);
    }
    //postcard--加载评论区
    getComment(cardId){
        return DAO('select commentUserId,commentContent,commentTime from comment where commentCardId=?',[cardId]);
    }
    //postcard--添加评论
    addComment(form){
        return DAO('insert into comment(commentCardId,commentUserId,commentTime,commentContent) VALUES(?,?,?,?)',[form.commentCardId,form.commentUserId,form.commentTime,form.commentContent]);
    }


}
module.exports = new DB();