var poolDAO = require("../model/poolDAO")
module.exports = {
    //完成发送功能，返回接收方一些基本信息和发送的明信片信息
    sendPostcard: async (ctx, next) => {
        try {
            let message= await poolDAO.sendPostcard(ctx.params.userId);
            let  mes=message[0];
            let ms=mes[0];
            let receiveMessage = {};
            // *************************************
            receiveMessage.receiveFans = ms.p_countFans,
                receiveMessage.receiveAttion =ms.p_countAttention,
                // ************************
            receiveMessage.cardReceiver = ms.p_cardReceive,
              receiveMessage.userNickname =ms.p_cardReceiveNickname,
                receiveMessage.userSex = ms.p_cardReceiveSex,
                receiveMessage.userEmail =ms.p_cardReceiveEmail,
                receiveMessage.userHeadPic =ms.p_cardReceiveHeadPic,
                receiveMessage.userBirthday =ms.p_cardReceiveBirthday,
                receiveMessage.userProvince = ms.p_cardReceiveProvince,
                receiveMessage.userCity = ms.p_cardReceiveCity,
                receiveMessage.cardId =ms.p_cardId,
                ctx.body = {"code": 200, "message": 'ok', data:receiveMessage};
             } catch (err) {
            ctx.body = {"code": 200, "message": err.message, data: []}
        }
    },
    //限制发送的次数和判断pool池里面是否有数据
    limitTimes: async (ctx, next) => {
        try {
            //获得用户的邮箱
            let sendemail= await poolDAO.sendEmail(ctx.params.userId);
            let sendemail1=sendemail[0];
            //得到邮箱为空的用户的数量
            let useremail= await poolDAO.userEmail(ctx.params.userId);
            let useremail1=useremail[0];
            //得到地址为空的用户的数量
            let useraddress= await poolDAO.userAddress(ctx.params.userId);
            let useraddress1=useraddress[0];
            //得到pool池里面的数据的总数
            let poolsum= await poolDAO.poolCount(ctx.params.userId);
            let poolsum1=poolsum[0];
            //得到用户已经发送的次数
            let count= await poolDAO.limitCount(ctx.params.userId);
            let count1=count[0];
            console.log(count1.sum);
            let t= {};
            t.times= count1.sum;
            t.pooltimes=poolsum1.sum;
            t.addresscount=useraddress1.sum;
            t.useremail=useremail1.sum;
            t.sendemail=sendemail1.userEmail;
            ctx.body = {"code": 200, "message": 'ok', data:t};
        } catch (err) {
            ctx.body = {"code": 200, "message": err.message, data: []}
        }
    },
    //向用户发送邮件
    //向用户发送邮件
    sendEmail: async (ctx, next) => {
        try {
            //转换时间
            var formatDate = function (date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            };
            // console.log(ctx.params.cardId);
            //获得接收方的id
            let receiveid= await poolDAO.getreceive(ctx.params.userId);
            let receiveid1=receiveid[0];
            //获得接收方的信息
            let receivemsg= await poolDAO.getreceivemsg(ctx.params.userId);
            let receiveidmasg1=receivemsg[0];
            //获得发送用户的邮箱
            let sendemail= await poolDAO.sendEmail(ctx.params.userId);
            let sendemail1=sendemail[0].userEmail;
            //获得接收用户的邮箱
            // let receiveemail=receiveidmasg1.userEmail
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
                host: "smtp.qq.com", // 主机
                secure: true, // 使用 SSL
                port: 465, // SMTP 端口
                auth: {
                    user: "2602121448@qq.com", // 账号
                    pass: "kaarphsplcsheafb" // 密码
                }
            });
            var mailOptions = {
                from: '2602121448@qq.com', // 同上面user
                // to: '1405496640@qq.com',
                to: sendemail1,
                subject: '即将接收你的明信片的用户的基本信息', // Subject line
                text: '成功了么', // plaintext body
                html: '<b>接收方id:</b>'+receiveid1.poolUserId+'<br>'
                    + '<b>接收方姓名:</b>'+receiveidmasg1.userName+'<br>'
                    + '<b>接收方性别:</b>'+receiveidmasg1.userSex+'<br>'
                    + '<b>接收方生日:</b>'+formatDate(receiveidmasg1.userBirthday)+'<br>'
                    + '<b>接收方地址:</b>'+receiveidmasg1.userAddress+'<br>'
                    + '<b>接收方邮编:</b>'+receiveidmasg1.userPostcode+'<br>'
                    + '<b>明信片ID:</b>'+ctx.params.cardId
                // html body
            };
            console.log("邮件")
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                }
            });
        } catch (err) {
            ctx.body = {"code": 200, "message": err.message, data: []}
        }
    },



    // sendEmail: async (ctx, next) => {
    //     try {
    //       //转换时间
    //       //   var formatDate = function (date) {
    //       //       var y = date.getFullYear();
    //       //       var m = date.getMonth() + 1;
    //       //       m = m < 10 ? '0' + m : m;
    //       //       var d = date.getDate();
    //       //       d = d < 10 ? ('0' + d) : d;
    //       //       return y + '-' + m + '-' + d;
    //       //   };
    //         // let remsg=ctx.params.msg;
    //         //获得接收方的id
    //         // let receiveid= await poolDAO.getreceive(ctx.params.userId);
    //         // let receiveid1=receiveid[0];
    //         //获得接收方的信息
    //         // let receivemsg= await poolDAO.getreceivemsg(ctx.params.userId);
    //         // let receiveidmasg1=receivemsg[0];
    //         //获得发送用户的邮箱
    //         // let sendemail= await poolDAO.sendEmail(ctx.params.userId);
    //         // let sendemail1=sendemail[0].userEmail;
    //         //获得接收用户的邮箱
    //         // let receiveemail=receiveidmasg1.userEmail
    //         var nodemailer = require('nodemailer');
    //         var transporter = nodemailer.createTransport({
    //             host: "smtp.qq.com", // 主机
    //             secure: true, // 使用 SSL
    //             port: 465, // SMTP 端口
    //             auth: {
    //                 user: "2602121448@qq.com", // 账号
    //                 pass: "kaarphsplcsheafb" // 密码
    //             }
    //         });
    //         var mailOptions = {
    //             from: '2602121448@qq.com', // 同上面user
    //             to: '1405496640@qq.com',
    //             // to: sendemail1,
    //
    //             subject: '即将接收你的明信片的用户的基本信息', // Subject line
    //             text: '成功了么', // plaintext body
    //             html: '<b>接收方id:</b>'+'<br>'
    //                 // +remsg.userNickname+'<br>'
    //                 // + '<b>接收方姓名:</b>'+receiveidmasg1.userName+'<br>'
    //                 // + '<b>接收方性别:</b>'+receiveidmasg1.userSex+'<br>'
    //                 // + '<b>接收方生日:</b>'+formatDate(receiveidmasg1.userBirthday)+'<br>'
    //                 // + '<b>接收方地址:</b>'+receiveidmasg1.userAddress+'<br>'
    //                 // // + '<b>发送方邮箱:</b>'+sendemail1
    //                 // + '<b>接收方邮箱:</b>'+receiveemail
    //             // html body
    //         };
    //         transporter.sendMail(mailOptions, function(error, info){
    //             if(error){
    //                 console.log(error);
    //             }else{
    //                 console.log('Message sent: ' + info.response);
    //             }
    //         });
    //     } catch (err) {
    //         ctx.body = {"code": 200, "message": err.message, data: []}
    //     }
    // },
}