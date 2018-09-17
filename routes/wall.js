const router = require('koa-router')()
const postcardController=require('../controllers/postcardController');
router.prefix('/wall')

router.get('/:city', async(ctx, next)=>{
    await postcardController.getPostCard(ctx,next);
});



module.exports = router