var poolDAO=require("../model/poolDAO")
module.exports={
    getUserId:async (ctx,next)=>{
        try{
            let jsondata=await poolDAO.getUserId();
            console.log(jsondata[0])
            ctx.body={"code":200,"message":'ok',data:[]}

        }catch (err) {
            ctx.body={"code":200,
                "message":'服务器错误',
                data:[]

            }
        }
    }
    ,
    updateRegion:async (ctx,next)=>{
        try{
            await poolDAO.updataRegion();
            ctx.body={"code":200,"message":'ok',data:[]}

        }catch (err) {
            ctx.body={"code":200,
                "message":'服务器错误',
                data:[]

            }
        }
    },
    getRegion:async (ctx,next)=>{
        try{
            let jsondata=await poolDAO.getRegion();
            console.log(jsondata)
            ctx.body={"code":200,"message":'ok',data:[]}

        }catch (err) {
            ctx.body={"code":200,
                "message":'服务器错误',
                data:[]
            }
        }
    },
    //
    setCarId:async (ctx,next)=>{
        try{
            let jsondata=await poolDAO.getRegion();
            let jsondata1=await poolDAO.setCardId(jsondata[0].regionId);
            console.log(jsondata1)
            ctx.body={"code":200,"message":'ok',data:[]}

        }catch (err) {
            ctx.body={"code":200,
                "message":'服务器错误',
                data:[]

            }
        }
    }

}