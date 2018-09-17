const DAO = require("../model/DAO");

class DB {
    //users === 关注用户的信息简介
    getAttentionSynopsis (userId) {
        return DAO("select userId, userNickname, userHeadPic, userSex, userProvince, userCity, TO_DAYS(now()) - TO_DAYS(userTime) joinTime,\n" +
                    "   (\n" +
                    "       -- 关注的用户的关注数\n" +
                    "       select count(attentionName)\n" +
                    "       from attention\n" +
                    "       where attentionFan = userId\n" +
                    "   ) as thisUserAttentionCount, \n" +
                    "   (\n" +
                    "       -- 关注的用户的粉丝数\n" +
                    "       select count(attentionFan)\n" +
                    "       from attention\n" +
                    "       where attentionName = userId\n" +
                    "   ) as thisUserFansCount,\n" +
                    "   (\n" +
                    "       true\n" +
                    "   ) as isAttention\n" +
                    "from attention, userinfo\n" +
                    "where attentionName = userId and attentionFan = ?", [userId]);
    }
    //users === 粉丝用户的信息简介
    getFansSynopsis (userId) {
        return DAO("select userId, userNickname, userHeadPic, userSex, userProvince, userCity, TO_DAYS(now()) - TO_DAYS(userTime) joinTime,\n" +
                    "   (\n" +
                    "       -- 关注的用户的关注数\n" +
                    "       select count(attentionName)\n" +
                    "       from attention\n" +
                    "       where attentionFan = userId\n" +
                    "   ) as thisUserAttentionCount, \n" +
                    "   (\n" +
                    "       -- 关注的用户的粉丝数\n" +
                    "       select count(attentionFan)\n" +
                    "       from attention\n" +
                    "       where attentionName = userId\n" +
                    "   ) as thisUserFansCount\n" +
                    "from attention, userinfo\n" +
                    "where attentionFan = userId and attentionName = ?", [userId]);
    }
    //users === 查询attention表(用于判断用户之间是否互关)
    getAttention () {
        return DAO("select attentionFan, attentionName " +
                    "from attention");
    }
    //users === 搜索用户
    getUser (userNickname) {
        return DAO("select distinct userId, userNickname, userHeadPic, userSex, userProvince, userCity, TO_DAYS(now()) - TO_DAYS(userTime) joinTime,\n" +
                    "   (\n" +
                    "       -- 关注的用户的关注数\n" +
                    "       select count(attentionName)\n" +
                    "       from attention\n" +
                    "       where attentionFan = userId\n" +
                    "   ) as thisUserAttentionCount, \n" +
                    "   (\n" +
                    "       -- 关注的用户的粉丝数\n" +
                    "       select count(attentionFan)\n" +
                    "       from attention\n" +
                    "       where attentionName = userId\n" +
                    "   ) as thisUserFansCount\n" +
                    "from attention, userinfo\n" +
                    "where userNickname = ?", userNickname);
    }
    //users === 关注用户
    insertAttention (userFan, userAttention) {
        return DAO("insert into attention(attentionFan, attentionName)\n" +
                    "values(?, ?)", [userFan, userAttention]);
    }
}

module.exports = new DB();