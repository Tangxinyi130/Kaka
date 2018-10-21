const DAO = require("../model/DAO");
class DB {
    //index--实时动态-最新发送动态
    getNewSend(){
        return DAO('call getNewSend();');
    }
    //index--实时动态-最新收到动态
    getNewReceive(){
        return DAO('call getNewReceive();')
    }
    // index --实时动态-最新
    getDynamic(){
        return DAO('	select * from view_senddynamic union all select * from view_receivedynamic ORDER BY dynamicTime')
    }
    //index--首页推荐最新的十张明信片墙
    getTenRecentPostcard(){
        return DAO('call getTenRecentPCard();')
    }



    //wall--获取所有图片
    getAllCard(){
        return DAO('select cardId,cardPic,cardLike from postcard where cardReceiveTime is not null and cardPic is not null ORDER BY cardReceiveTime DESC;',[]);
    }
    //获取所有城市id和城市名
    getAllCity(){
        return DAO('select regionId,regionName from region');
    }
    //wall--根据搜索框内输入的城市搜索明信片
    getPostCard(city){
        return DAO('select * from postcard where cardSendRegion=? and cardReceiveTime is not null and cardPic is not null ORDER BY cardReceiveTime DESC;\n',[city]);
    }
    //wall--分页
    getPage(page){
        const pageNumber=3;
        let start=(page-1)*pageNumber;
        return DAO('SELECT * FROM ( SELECT cardId, cardPic, cardLike FROM postcard WHERE cardReceiveTime IS NOT NULL AND cardPic IS NOT NULL ORDER BY cardReceiveTime DESC ) form LIMIT '+start+","+pageNumber,[]);
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

    //查询点赞数量
    getLikeNum(cardId){
        return DAO('select cardLike from postcard where cardId=?',[cardId])
    }
    //postcard--添加一条点赞
    addLike(cardId){
        return DAO('update postcard set cardLike=cardLike+1 where cardId= ?',[cardId]);
    }
    //postcard--取消点赞
    unLike(cardId){
        return DAO('update postcard set cardLike=cardLike-1 where cardId= ?',[cardId]);
    }
    //postcard === 地图上显示发送方和收取方两地
    showPath(sendUserId, receiveUserId) {
        return DAO("select userId, userAddress\n" +
                    "from userinfo\n" +
                    "where userId = ? or userId = ?", [sendUserId, receiveUserId]);
    }


    //receive --- 根据输入明信片的id，更新postcard中明信片的照片
    uploadPic(cardPic,cardId){
        return DAO(' UPDATE postcard set cardPic=? where cardId=?',[cardPic,cardId]);
    }
    //查看输入的明信片的id在数据库中是否存在
    exist(cardId,userId){
        return DAO('select count(1) sum from postcard where cardId=? and cardReceiveTime is null and cardReceiver=? ;',[cardId,userId]);
    }
    //receive --- 实现接收功能,更新了postcard里的接收时间和把发送方添加到池里面
    receive(cardId){
        return DAO('call p_receive(?);',[cardId]);
    }

    //receive === 提供两个用户的地址，由前端进行距离计算
    //使用showPath的查询语句

    //receive === 获取前端计算完成的距离，插入对应的明信片信息中
    updateDistance (distance, cardId) {
        return DAO("update postcard\n" +
                    "set cardDistance = ?\n" +
                    "where cardId = ?", [distance, cardId]);
    }
}
module.exports = new DB();